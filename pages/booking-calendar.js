import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function parseFriendlyDate(str) {
  // expecting format like: "Tue, Apr 21, 2026" or similar
  if (!str) return null;
  try {
    // attempt Date.parse fallback
    const parts = str.split(',');
    if (parts.length >= 2) {
      const rest = parts[1].trim();
      // rest like "Apr 21, 2026"
      const d = new Date(rest);
      if (!isNaN(d)) return d;
    }
    const d2 = new Date(str);
    return isNaN(d2) ? null : d2;
  } catch (e) {
    return null;
  }
}

export default function BookingCalendarPage() {
  const [booking, setBooking] = useState(null);
  const [dateObj, setDateObj] = useState(null);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem('lastBooking') : null;
      if (raw) {
        const b = JSON.parse(raw);
        setBooking(b);
        const d = parseFriendlyDate(b.date);
        setDateObj(d);
      }
    } catch (e) {
      console.error('Failed to read lastBooking', e);
    }
  }, []);

  if (!booking) {
    return (
      <div className={styles.main} style={{ padding: 40 }}>
        <h2>No booking found</h2>
        <p>We couldn't find a recent booking. Please make a booking first.</p>
        <p>
          <Link href="/">Return home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.main} style={{ padding: 24 }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <h1 style={{ marginBottom: 6 }}>Booking calendar</h1>
        <p style={{ color: '#6b8aa0', marginBottom: 20 }}>Your recent request is shown below. HT Service will confirm the appointment.</p>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: '0 0 360px' }}>
            <div style={{ padding: 16, borderRadius: 8, background: '#022233' }}>
              <div style={{ color: '#cfeafd', fontWeight: 800, marginBottom: 8 }}>Requested slot</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{booking.time || '-'}</div>
              <div style={{ marginTop: 6 }}>{booking.date || '-'}</div>
              <div style={{ marginTop: 12 }}>
                <div style={{ color: '#cfeafd', fontWeight: 800 }}>Contact</div>
                <div style={{ marginTop: 6 }}>{booking.name}</div>
                <div>{booking.phone}</div>
                <div style={{ marginTop: 8 }}>{booking.address}</div>
              </div>
            </div>

            <div style={{ marginTop: 18, padding: 12, borderRadius: 8, background: '#071324' }}>
              <div style={{ fontWeight: 800, color: '#e6fbff', marginBottom: 6 }}>Services</div>
              {booking.services && booking.services.length ? (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {booking.services.map(s => (
                    <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                      <span>{s.name}</span>
                      <span>৳{(s.price||0).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              ) : <div style={{ color: '#6b8aa0' }}>No priced services selected.</div>}

              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <div>Total</div>
                <div>৳{(booking.total||0).toLocaleString()}</div>
              </div>
            </div>

          </div>

          <div style={{ flex: 1 }}>
            <div style={{ padding: 16, borderRadius: 8, background: '#021827' }}>
              <div style={{ color: '#cfeafd', fontWeight: 800, marginBottom: 10 }}>Calendar</div>
              {dateObj ? (
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800 }}>{dateObj.getDate()}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{MONTHS[dateObj.getMonth()]} {dateObj.getFullYear()}</div>
                    <div style={{ color: '#6b8aa0' }}>{DAY_NAMES[dateObj.getDay()]}</div>
                  </div>
                </div>
              ) : (
                <div style={{ color: '#6b8aa0' }}>No date selected</div>
              )}

              <div style={{ marginTop: 18 }}>
                <p style={{ color: '#6b8aa0' }}>HT Service will review your request and confirm via phone.</p>
                <p>If you need to change your booking, contact: <a href="tel:+8801795180400">+8801795180400</a></p>
              </div>

              <div style={{ marginTop: 14 }}>
                <Link href="/" className="btn">Back to home</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
