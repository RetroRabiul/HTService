import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/BookingCalendar.module.css';

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
      <div className={styles.page}>
        <div className={styles.bgGlowTop} aria-hidden="true" />
        <div className={styles.bgGlowBottom} aria-hidden="true" />
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No booking found</h2>
          <p className={styles.emptyText}>We could not find a recent booking in this browser session.</p>
          <Link href="/" className={styles.primaryBtn}>Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bgGlowTop} aria-hidden="true" />
      <div className={styles.bgGlowBottom} aria-hidden="true" />

      <main className={styles.wrap}>
        <header className={styles.header}>
          <h1 className={styles.title}>Booking Request Received</h1>
          <p className={styles.subtitle}>Your latest booking details are shown below. HT Service will confirm your appointment by phone.</p>
        </header>

        <section className={styles.grid}>
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>Requested Slot</h2>
            <div className={styles.slotTime}>{booking.time || '-'}</div>
            <div className={styles.slotDate}>{booking.date || '-'}</div>

            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Contact</h3>
              <p className={styles.line}>{booking.name}</p>
              <p className={styles.line}>{booking.phone}</p>
              <p className={styles.line}>{booking.address}</p>
            </div>
          </article>

          <article className={styles.card}>
            <h2 className={styles.cardTitle}>Services & Total</h2>
            {booking.services && booking.services.length ? (
              <ul className={styles.serviceList}>
                {booking.services.map(s => (
                  <li key={s.id} className={styles.serviceItem}>
                    <span className={styles.serviceName}>{s.name}</span>
                    <span className={styles.servicePrice}>৳{(s.price || 0).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.muted}>No priced services selected.</p>
            )}

            <div className={styles.totalRow}>
              <span>Total</span>
              <strong>৳{(booking.total || 0).toLocaleString()}</strong>
            </div>
          </article>

          <article className={styles.cardWide}>
            <div className={styles.dateBadge}>
              {dateObj ? (
                <>
                  <div className={styles.dayNumber}>{dateObj.getDate()}</div>
                  <div>
                    <div className={styles.monthYear}>{MONTHS[dateObj.getMonth()]} {dateObj.getFullYear()}</div>
                    <div className={styles.weekday}>{DAY_NAMES[dateObj.getDay()]}</div>
                  </div>
                </>
              ) : (
                <p className={styles.muted}>No date selected</p>
              )}
            </div>

            <p className={styles.infoText}>If you need to change your booking, call <a href="tel:+8801795180400" className={styles.phoneLink}>+8801795180400</a>.</p>

            <div className={styles.actions}>
              <Link href="/" className={styles.primaryBtn}>Back to home</Link>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
