import { useState } from 'react';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import newsStyles from '../styles/News.module.css';
import BookingModal from '../components/BookingModal';
import ServicesModal from '../components/ServicesModal';

const categories = [
  { icon: '🧹', label: 'Cleaning service' },
  { icon: '🦟', label: 'Pest control service' },
  { icon: '🚚', label: 'Shifting Service' },
  { icon: '❄️', label: 'AC Service' },
  { icon: '🏗️', label: 'Construction Service' },
];

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
            {categories.map(({ icon, label }) => (
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
                <div className={styles.categoryIcon}>{icon}</div>
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

        {/* Before & After Gallery (from News) */}
        <section className={newsStyles.beforeAfterSection}>
          <h2 className={newsStyles.sectionTitle}>Before & After Cleaning</h2>
          <p className={newsStyles.sectionSubtitle}>Real results from recent HT Service cleanings — swipe your eyes across the pairs to see the difference.</p>

          <div className={newsStyles.beforeAfterGrid}>
            <div className={newsStyles.beforeAfterCard}>
              <div className={newsStyles.beforeAfterImageWrap}>
                <div className={newsStyles.pairImages}>
                  <div className={newsStyles.pairImgWrap}>
                    <Image src="/info/sofa_before.png" alt="Sofa before" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={newsStyles.pairImgWrap}>
                    <Image src="/info/sofa_after.png" alt="Sofa after" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div className={newsStyles.beforeAfterCaption}>
                <strong>Sofa Deep Clean:</strong> Stains and grime removed, fabric revitalized.
              </div>
            </div>

            <div className={newsStyles.beforeAfterCard}>
              <div className={newsStyles.beforeAfterImageWrap}>
                <div className={newsStyles.pairImages}>
                  <div className={newsStyles.pairImgWrap}>
                    <Image src="/info/kitchen_before.png" alt="Kitchen before" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={newsStyles.pairImgWrap}>
                    <Image src="/info/kitchen_after.png" alt="Kitchen after" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div className={newsStyles.beforeAfterCaption}>
                <strong>Tile & Counter Cleaning:</strong> Mold and grease cleared, surfaces sanitized.
              </div>
            </div>

            <div className={newsStyles.beforeAfterCard}>
              <div className={newsStyles.beforeAfterImageWrap}>
                <div className={newsStyles.pairImages}>
                  <div className={newsStyles.pairImgWrap}>
                    <Image src="/info/stove_before.jpeg" alt="Stove before" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={newsStyles.pairImgWrap}>
                    <Image src="/info/stove_after.jpeg" alt="Stove after" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <div className={newsStyles.beforeAfterCaption}>
                <strong>Stove Restoration:</strong> Heavy carbon deposits removed, safe to use.
              </div>
            </div>

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
