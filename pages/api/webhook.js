// pages/api/webhook.js
//
// Handles Facebook webhook verification (GET) and incoming events (POST).
// Facebook calls GET with a challenge when you click "Verify and save".
//
// Add to Vercel env vars:
//   WEBHOOK_VERIFY_TOKEN=htservice_verify_2026   (or any secret string you chose)

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Facebook webhook verification handshake
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'POST') {
    // Acknowledge receipt immediately (Facebook requires < 20s response)
    res.status(200).send('EVENT_RECEIVED');
    // You can process incoming messages here if needed in the future
    return;
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
