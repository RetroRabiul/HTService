import { useState } from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import BookingModal from '../components/BookingModal';
import ServicesModal from '../components/ServicesModal';

const categories = [
  { label: 'Cleaning service' },
  { label: 'Pest control service' },
  { label: 'Shifting Service' },
  { label: 'AC Service' },
  { label: 'Construction Service' },
];

function renderIcon(label) {
  const common = { width: 36, height: 36, viewBox: '0 0 36 36', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' };
  switch (label) {
    case 'Cleaning service':
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="6" width="18" height="12" rx="2" strokeWidth="2" stroke="currentColor" fill="currentColor" />
          <rect x="22" y="18" width="6" height="12" rx="2" transform="rotate(-20 22 18)" strokeWidth="2" stroke="currentColor" fill="currentColor" />
        </svg>
      );
    case 'Pest control service':
      return (
        <svg {...common} aria-hidden>
          <circle cx="18" cy="18" r="6" strokeWidth="2" stroke="currentColor" fill="currentColor" />
          <path d="M6 18h6M24 18h6M18 6v6M18 24v6" strokeWidth="2" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case 'Shifting Service':
      return (
        <svg {...common} aria-hidden>
          <rect x="4" y="12" width="22" height="10" rx="2" strokeWidth="2" stroke="currentColor" fill="currentColor" />
          <rect x="26" y="8" width="6" height="8" rx="1" strokeWidth="2" stroke="currentColor" fill="currentColor" />
          <circle cx="10" cy="26" r="2" fill="currentColor" />
          <circle cx="24" cy="26" r="2" fill="currentColor" />
        </svg>
      );
    case 'AC Service':
      return (
        <svg {...common} aria-hidden>
          <circle cx="18" cy="18" r="10" strokeWidth="2" stroke="currentColor" />
          <path d="M18 8v8l6 6" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'Construction Service':
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="12" width="20" height="12" rx="1.5" strokeWidth="2" stroke="currentColor" fill="currentColor" />
          <path d="M6 12 L18 4 L30 12" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

const popularServices = [
  { id: 1, title: 'Cleaning service', desc: 'General cleaning for homes & offices', color: '#0077c8' },
  { id: 2, title: 'Pest control service', desc: 'Mosquito and pest treatment', color: '#005fa3' },
  { id: 3, title: 'Shifting Service', desc: 'Packing, loading and moving assistance', color: '#00a3b4' },
  { id: 4, title: 'AC Service', desc: 'AC maintenance, cleaning and repair', color: '#00B4D8' },
  { id: 5, title: 'Construction Service', desc: 'Post-construction cleaning & debris removal', color: '#004080' },
];

export default function Home() {
  const [booking, setBooking] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [initialServiceId, setInitialServiceId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showServicesModal, setShowServicesModal] = useState(false);

  function handleBook(data) {
    setConfirmedBooking(data);
    setBooking(false);
  }
  return (
    <>
      <Navigation onBookClick={() => { setInitialServiceId(null); setBooking(true); }} />
      <main className={styles.main}>

        {/* Booking Confirmation */}
        {confirmedBooking && (
          <section className={styles.bookingConfirmation}>
            <div className={styles.bookingConfirmCard}>
              <div className={styles.bookingConfirmIcon}>&#10003;</div>
              <div className={styles.bookingConfirmBody}>
                <p className={styles.bookingConfirmHeading}>
                  <strong>{confirmedBooking.name || 'A customer'}</strong> has requested the following services:
                </p>
                <ul className={styles.bookingServiceList}>
                  {confirmedBooking.services.map(s => (
                    <li key={s.id} className={styles.bookingServiceItem}>
                      <span>{s.name}</span>
                      <span className={styles.bookingServicePrice}>Tk {s.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.bookingDateLine}>
                  At the following date &amp; time: <strong>{confirmedBooking.time}, {confirmedBooking.date}</strong>
                </p>
                <p className={styles.bookingDateLine}>
                  Address: <strong>{confirmedBooking.address}</strong>
                </p>
                {confirmedBooking.phone && (
                  <p className={styles.bookingDateLine}>
                    Phone: <strong>{confirmedBooking.phone}</strong>
                  </p>
                )}
                {confirmedBooking.notes ? (
                  <p className={styles.bookingNotes}>
                    Notes from customer: <em>{confirmedBooking.notes}</em>
                  </p>
                ) : null}
                <p className={styles.bookingTotal}>
                  Total: <strong>Tk {confirmedBooking.total.toLocaleString()}</strong>
                </p>
              </div>
              <button className={styles.bookingDismiss} onClick={() => setConfirmedBooking(null)} aria-label="Dismiss">
                &#10005;
              </button>
            </div>
          </section>
        )}

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image src="/home_page/ht_bg.png" alt="Cleaning services background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Your Complete Service Partner</h1>
            <p className={styles.heroSubtitle}>
              One-stop solution for Cleaning, Pest Control, Construction, Shifting &amp; AC Service.
            </p>
            <p className={styles.heroSubtitle}>
              Reliable, fast and available 24/7 for your home and office needs.
            </p>
            <div className={styles.heroActions}>
              <button id="hero-book-btn" aria-label="Book a Service" className={styles.bookBtn} onClick={() => setBooking(true)}>
                Book a Service
              </button>
              <a href="tel:+8801795180400" aria-label="Call HT Service" className={styles.callBtn}>
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Category Tiles */}
        <div className={styles.categoriesWrap}>
          <div className={styles.categoriesGrid}>
            {categories.map(({ label }) => (
              <div
                key={label}
                className={[styles.categoryTile, activeCategory === label ? styles.categoryTileActive : ''].filter(Boolean).join(' ')}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveCategory(label);
                  setShowServicesModal(true);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveCategory(label);
                    setShowServicesModal(true);
                  }
                }}
                aria-pressed={activeCategory === label}
              >
                <div className={styles.categoryIcon} aria-hidden>{renderIcon(label)}</div>
                <span className={styles.categoryLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        {showServicesModal && (
          <ServicesModal
            onClose={() => setShowServicesModal(false)}
            onSelect={svc => {
              setInitialServiceId(svc.id);
              setBooking(true);
              setShowServicesModal(false);
            }}
          />
        )}

        {/* Popular Services */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Services</h2>
            <a href="#contact" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.popularGrid}>
            {popularServices.map(({ id, title, desc, color }) => (
              <div
                key={title}
                className={styles.popularCard}
                style={{ background: color }}
                role="button"
                tabIndex={0}
                onClick={() => { setInitialServiceId(id); setBooking(true); }}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (setInitialServiceId(id), setBooking(true))}
                aria-label={`Book ${title}`}
              >
                <div className={styles.popularBg}>
                  <Image src="/home_page/ht_bg.png" alt={title} fill style={{ objectFit: 'cover', opacity: 0.18 }} />
                </div>
                <div className={styles.popularContent}>
                  <h3 className={styles.popularTitle}>{title}</h3>
                  <p className={styles.popularDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.sectionAlt}>
          <h2 className={styles.sectionTitle}>Why Choose HT Service?</h2>
          <div className={styles.featureGrid}>
            <Feature icon="👨‍🔧" title="Professional Team" description="Trained and experienced cleaning specialists" />
            <Feature icon="🌿" title="Eco-Friendly Products" description="Safe for your family and the environment" />
            <Feature icon="💰" title="Affordable Rates" description="Quality service at competitive prices" />
            <Feature icon="📅" title="Flexible Scheduling" description="We work around your schedule" />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.contactSection}>
          <h2 className={styles.contactTitle}>Ready to Get Started?</h2>
          <p className={styles.contactSubtitle}>Contact HT Service today for a free consultation and quote.</p>
          <div className={styles.contactCard}>
            <h3 className={styles.contactCardTitle}>HT Service</h3>
            <p className={styles.contactInfo}>📍 Dhaka, Bangladesh</p>
            <p className={styles.contactInfo}>📞 01795180400</p>
            <p className={styles.contactInfo}>✉️ info@htservice.com</p>
          </div>
          <div className={styles.contactBtns}>
            <a href="tel:+8801795180400" className={styles.btnPrimary}>Call Now</a>
            <a href="mailto:info@htservice.com" className={styles.btnSecondary}>Email Us</a>
          </div>
        </section>

          <footer className={styles.footer}>
          <p className={styles.footerText}>HT Service - Honest & Trusted service by Bipul</p>
          <small>&copy; 2026 HT Service. All rights reserved. Serving Dhaka, Bangladesh.</small>
        </footer>

      </main>
      {booking && (
        <BookingModal
          onClose={() => { setBooking(false); setInitialServiceId(null); }}
          onBook={handleBook}
          initialSelected={initialServiceId}
        />
      )}
    </>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}
