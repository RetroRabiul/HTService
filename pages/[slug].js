import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import BookingModal from '../components/BookingModal';

export default function ServicePage({ service, category }) {
  const [booking, setBooking] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Service not found.</p>
      </div>
    );
  }

  const heroTitle = `Your ${String(category).replace(/Services?$/i, '').trim()} Service Partner`;

  function handleBook(data) {
    setConfirmedBooking(data);
    setBooking(false);
  }

  return (
    <>
      <Navigation onBookClick={() => setBooking(true)} onOpenServices={() => {}} />
      <main className={styles.main}>
        {confirmedBooking && (
          <section className={styles.bookingConfirmation}>
            <div className={styles.bookingConfirmCard}>
              <div className={styles.bookingConfirmIcon}>&#10003;</div>
              <div className={styles.bookingConfirmBody}>
                <p className={styles.bookingConfirmHeading}>
                  <strong>{confirmedBooking.name || 'A customer'}</strong> has requested the following services:
                </p>
                <ul className={styles.bookingServiceList}>
                  {confirmedBooking.services && confirmedBooking.services.filter(s => (s.price || 0) > 0).map(s => (
                    <li key={s.id} className={styles.bookingServiceItem}>
                      <span>{s.name}</span>
                      <span className={styles.bookingServicePrice}>৳{s.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.bookingTotal}>
                  Total: <strong>৳{confirmedBooking.total.toLocaleString()}</strong>
                </p>
              </div>
              <button className={styles.bookingDismiss} onClick={() => setConfirmedBooking(null)} aria-label="Dismiss">
                &#10005;
              </button>
            </div>
          </section>
        )}

        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image src="/home_page/ht_bg.png" alt="Service background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            <p className={styles.heroSubtitle}>One-stop solution for Cleaning, Pest Control, Construction, Shifting &amp; AC Service.</p>
            <p className={styles.heroSubtitle}>Reliable, fast and available 24/7 for your home and office needs.</p>
            <div className={styles.heroActions}>
              <button id="hero-book-btn" aria-label="Book a Service" className={styles.bookBtn} onClick={() => setBooking(true)}>
                Book a Service
              </button>
              <a href="tel:+8801795180400" aria-label="Call HT Service" className={styles.callBtn}>Call Now</a>
            </div>
          </div>
        </section>

        <section style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ marginTop: 0 }}>{service.name}</h2>
          {service.description && <p style={{ color: '#333' }}>{service.description}</p>}

          {service.prices && service.prices.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h3>Prices</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {service.prices.map((p, idx) => (
                  <div key={idx} style={{ padding: 12, border: '1px solid #e6e6e6', borderRadius: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.label}</div>
                      {p.details && <div style={{ fontSize: 13, color: '#666' }}>{p.details}</div>}
                      {p.note && <div style={{ fontSize: 12, color: '#888' }}>{p.note}</div>}
                    </div>
                    <div style={{ fontWeight: 800, color: '#0077c8' }}>{p.price ? `৳${p.price}` : ''} {p.pricing_unit ? ` ${p.pricing_unit}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>

        <footer className={styles.footer}>
          <p className={styles.footerText}>HT Service - Honest & Trusted service by Bipul</p>
          <small>&copy; 2026 HT Service. All rights reserved. Serving Dhaka, Bangladesh.</small>
        </footer>

      </main>

      {booking && (
        <BookingModal
          onClose={() => setBooking(false)}
          onBook={handleBook}
          initialSelected={null}
          preselectedItems={null}
          startStep={1}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params || {};
  const filePath = path.join(process.cwd(), 'public', 'info', 'services.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    for (const bs of (data.business_services || [])) {
      for (const sc of (bs.subcategories || [])) {
        if (sc && sc.slug === slug) {
          return { props: { service: sc, category: bs.category || '' } };
        }
      }
    }
  } catch (e) {
    // ignore
  }
  return { notFound: true };
}
