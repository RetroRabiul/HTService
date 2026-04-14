import Navigation from '../components/Navigation';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={styles.main}>

        {/* Hero */}
        <section className={styles.hero} style={{ background: 'linear-gradient(135deg, rgba(0,64,128,0.95) 0%, rgba(0,102,204,0.9) 100%)' }}>
          <div className={styles.heroBg}>
            <Image src="/home_page/ht_bg.png" alt="Cleaning services background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Professional Cleaning Services in Dhaka</h1>
            <p className={styles.heroSubtitle}>
              Your trusted partner for spotless homes and offices. HT Service brings professional cleaning excellence to Dhaka, Bangladesh.
            </p>
            <a href="#contact" className={styles.heroCta} style={{ background: '#00B4D8', color: '#fff', boxShadow: '0 6px 20px rgba(0,180,216,0.4)' }}>
              Get a Free Quote
            </a>
          </div>
        </section>

        {/* Services */}
        <section className={styles.section} style={{ background: '#ffffff' }}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSubtitle}>Comprehensive cleaning solutions tailored to your needs</p>
          <div className={styles.serviceGrid}>
            <ServiceCard title="Residential Cleaning" description="Deep cleaning for homes, apartments, and condos. Keep your living space fresh and healthy." icon="🏠" />
            <ServiceCard title="Office Cleaning" description="Maintain a professional and productive workplace with our commercial cleaning services." icon="🏢" />
            <ServiceCard title="Pest Prevention" description="Specialized cleaning to reduce mosquitoes and prevent pest infestations in your home." icon="🦟" />
            <ServiceCard title="Deep Sanitization" description="Thorough sanitization services for a healthier, germ-free environment." icon="✨" />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.sectionAlt}>
          <h2 className={styles.sectionTitle}>Why Choose HT Service?</h2>
          <div className={styles.featureGrid}>
            <Feature title="Professional Team" description="Trained and experienced cleaning specialists" />
            <Feature title="Eco-Friendly Products" description="Safe for your family and the environment" />
            <Feature title="Affordable Rates" description="Quality service at competitive prices" />
            <Feature title="Flexible Scheduling" description="We work around your schedule" />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.contactSection} style={{ background: 'linear-gradient(135deg, #004080 0%, #0066cc 100%)' }}>
          <h2 className={styles.contactTitle}>Ready to Get Started?</h2>
          <p className={styles.contactSubtitle}>Contact HT Service today for a free consultation and quote.</p>
          <div className={styles.contactCard}>
            <h3 className={styles.contactCardTitle}>HT Service</h3>
            <p className={styles.contactInfo}>ðŸ“ Dhaka, Bangladesh</p>
            <p className={styles.contactInfo}>ðŸ“ž Contact us for inquiries</p>
            <p className={styles.contactInfo}>âœ‰ï¸ info@htservice.com</p>
          </div>
          <div className={styles.contactBtns}>
            <a href="tel:+880" className={styles.btnPrimary} style={{ background: '#00B4D8', color: '#fff', boxShadow: '0 4px 12px rgba(0,180,216,0.3)' }}>
              Call Now
            </a>
            <a href="mailto:info@htservice.com" className={styles.btnSecondary} style={{ background: 'white', color: '#004080' }}>
              Email Us
            </a>
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

function ServiceCard({ title, description, icon }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceIcon}>{icon}</div>
      <h3 className={styles.serviceCardTitle}>{title}</h3>
      <p className={styles.serviceCardDesc}>{description}</p>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className={styles.featureItem}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}
