import Navigation from '../components/Navigation';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const categories = [
  { icon: '🏠', label: 'Residential Cleaning' },
  { icon: '🏢', label: 'Office Cleaning' },
  { icon: '🦟', label: 'Pest Prevention' },
  { icon: '✨', label: 'Deep Sanitization' },
  { icon: '🚿', label: 'Bathroom Cleaning' },
  { icon: '🍳', label: 'Kitchen Cleaning' },
  { icon: '🛋️', label: 'Sofa & Upholstery' },
  { icon: '🪟', label: 'Window Cleaning' },
];

const popularServices = [
  { title: 'Home Cleaning', desc: 'Full home deep clean', color: '#004080' },
  { title: 'Office Cleaning', desc: 'Keep workspaces spotless', color: '#0066cc' },
  { title: 'Pest Prevention', desc: 'Mosquito & pest control', color: '#005fa3' },
  { title: 'Deep Sanitization', desc: 'Germ-free environments', color: '#00B4D8' },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={styles.main}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image src="/home_page/ht_bg.png" alt="Cleaning services background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Your Home Cleaning Expert</h1>
            <p className={styles.heroSubtitle}>
              One-stop solution for all cleaning needs. Book any service, anytime.
            </p>
            <div className={styles.searchBar}>
              <div className={styles.locationPill}>
                <span>📍</span>
                <span className={styles.locationText}>Dhaka</span>
              </div>
              <div className={styles.searchDivider} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Find your service e.g. Home Cleaning, Pest..."
              />
              <button className={styles.searchBtn} aria-label="Search">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Category Tiles */}
        <div className={styles.categoriesWrap}>
          <div className={styles.categoriesGrid}>
            {categories.map(({ icon, label }) => (
              <div key={label} className={styles.categoryTile}>
                <div className={styles.categoryIcon}>{icon}</div>
                <span className={styles.categoryLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Services</h2>
            <a href="#contact" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.popularGrid}>
            {popularServices.map(({ title, desc, color }) => (
              <div key={title} className={styles.popularCard} style={{ background: color }}>
                <div className={styles.popularBg}>
                  <Image src="/home_page/ht_bg.png" alt={title} fill style={{ objectFit: 'cover', opacity: 0.2 }} />
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
            <p className={styles.contactInfo}>📞 Contact us for inquiries</p>
            <p className={styles.contactInfo}>✉️ info@htservice.com</p>
          </div>
          <div className={styles.contactBtns}>
            <a href="tel:+880" className={styles.btnPrimary}>Call Now</a>
            <a href="mailto:info@htservice.com" className={styles.btnSecondary}>Email Us</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <p className={styles.footerText}>HT Service - House to Service by Khan</p>
          <small>&copy; 2026 HT Service. All rights reserved. Serving Dhaka, Bangladesh.</small>
        </footer>

      </main>
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
