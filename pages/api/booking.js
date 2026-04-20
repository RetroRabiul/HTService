// pages/api/booking.js
//
// Sends a booking notification to the business owner via Facebook Messenger.
//
// SETUP (one-time):
// 1. Go to developers.facebook.com → create an App → add Messenger product
// 2. Generate a Page Access Token for your HT Service Facebook Page
// 3. To find your Admin PSID: go to your Facebook Page inbox, click on your
//    own profile in a conversation. The URL will contain your PSID.
//    Alternatively: send a message TO your page from your personal account,
//    then call GET https://graph.facebook.com/v19.0/me/conversations?access_token=TOKEN
//    to retrieve the sender PSIDs.
// 4. Add these to your Vercel project settings under Environment Variables:
//    FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token
//    FACEBOOK_ADMIN_PSID=your_personal_psid
// 5. Redeploy on Vercel after adding the env vars.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, address, notes, time, date, services, total } = req.body;

  // Server-side validation
  if (
    !name || typeof name !== 'string' || name.trim().length === 0 ||
    !phone || typeof phone !== 'string' || phone.trim().length === 0 ||
    !address || typeof address !== 'string' || address.trim().length === 0 ||
    !Array.isArray(services) || services.length === 0
  ) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const adminPsid = process.env.FACEBOOK_ADMIN_PSID;

  if (!token || !adminPsid) {
    // Don't break the booking if env vars aren't set — just log it
    console.warn('Facebook notification skipped: env vars not configured');
    return res.status(200).json({ success: true, notified: false });
  }

  const serviceLines = services
    .map(s => `  • ${s.name} — ৳${Number(s.price).toLocaleString()}`)
    .join('\n');

  const messageText = [
    '📋 New Booking Request — HT Service',
    '',
    `👤 Name: ${name.trim()}`,
    `📞 Phone: ${phone.trim()}`,
    `📍 Address: ${address.trim()}`,
    '',
    `🗓️ Date & Time: ${time}, ${date}`,
    '',
    '🧹 Services Requested:',
    serviceLines,
    '',
    `💰 Total: ৳${Number(total).toLocaleString()}`,
    notes && notes.trim() ? `\n📝 Notes: ${notes.trim()}` : '',
  ].filter(line => line !== null && line !== undefined).join('\n').trim();

  try {
    const fbResponse = await fetch('https://graph.facebook.com/v19.0/me/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recipient: { id: adminPsid },
        message: { text: messageText },
        messaging_type: 'MESSAGE_TAG',
        tag: 'CONFIRMED_EVENT_UPDATE',
      }),
    });

    const fbData = await fbResponse.json();

    if (!fbResponse.ok) {
      console.error('Facebook API error:', JSON.stringify(fbData));
      // Don't return 500 — booking still succeeded, only notification failed
      return res.status(200).json({ success: true, notified: false, fbError: fbData.error?.message });
    }

    return res.status(200).json({ success: true, notified: true });
  } catch (err) {
    console.error('Error sending Facebook notification:', err);
    return res.status(200).json({ success: true, notified: false });
  }
}
