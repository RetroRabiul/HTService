import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import BookingModal from '../../components/BookingModal';
import ServicesModal from '../../components/ServicesModal';
import { useBooking } from '../../contexts/BookingContext';
import homeStyles from '../../styles/Home.module.css';
import pageStyles from '../../styles/ServicePage.module.css';

const SERVICE = {
  id: 101,
  name: 'Bathroom Deep Cleaning',
  icon: '🚿',
  tagline: 'Professional deep cleaning for sparkling bathrooms',
  description:
    'Our expert team provides thorough deep cleaning for every corner of your bathroom — floors, walls, basins, commodes, mirrors, and ventilators. We use professional-grade cleaning agents that eliminate germs, limescale, and soap scum, leaving your bathroom hygienically clean and fresh.',
  includes: [
    'Floor scrubbing & disinfection',
    'Wall tile cleaning & grout treatment',
    'Single basin deep clean',
    'Single pan / commode sanitisation',
    'Mirror polishing',
    'Ventilator cleaning',
  ],
  packages: [
    { label: 'Only Bathroom', price: 1000, desc: 'Standard bathroom deep clean' },
    { label: 'Bathroom With Bathtub', price: 1200, desc: 'Includes bathtub scrub & descale' },
    { label: 'Bathroom With Shower Corner', price: 1500, desc: 'Includes shower enclosure detail clean' },
    { label: 'Bathroom With Bathtub & Shower Corner', price: 1600, desc: 'Full bathroom deep clean — all features' },
  ],
  faqs: [
    {
      q: 'How long does the service take?',
      a: 'Typically 1–2 hours per bathroom, depending on size and condition.',
    },
    {
      q: 'Do I need to supply any equipment?',
      a: 'No. Our team brings all necessary equipment and professional cleaning products.',
    },
    {
      q: 'Is the service available daily?',
      a: 'Yes, you can schedule any day that suits you, including weekends.',
    },
    {
      q: 'What if I have multiple bathrooms?',
      a: 'We offer discounted rates for multiple bathrooms in the same booking. Contact us for a custom quote.',
    },
  ],
};

export default function BathroomDeepCleaning() {
  const router = useRouter();
  const bookingCtx = useBooking();
  const [showBooking, setShowBooking] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  function handleBook(pkg) {
    setSelectedPackage(pkg);
    setShowBooking(true);
  }

  return (
    <>
      <Navigation
        onBookClick={() => setShowBooking(true)}
        onOpenServices={() => setShowServices(true)}
      />

      <main className={pageStyles.pagebody}>
        {/* ── Hero — identical structure to home page ── */}
        <section className={homeStyles.hero}>
          <div className={homeStyles.heroBg}>
            <Image src="/home_page/ht_bg.png" alt="Bathroom deep cleaning background" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={homeStyles.heroOverlay} />
          <div className={homeStyles.heroContent}>
            <div className={pageStyles.heroCrumb}>
              <span className={pageStyles.crumbLink} onClick={() => router.push('/')}>Home</span>
              <span className={pageStyles.crumbSep}>/</span>
              <span className={pageStyles.crumbLink} onClick={() => router.push('/all-services')}>All Services</span>
              <span className={pageStyles.crumbSep}>/</span>
              <span className={pageStyles.crumbCurrent}>Bathroom Deep Cleaning</span>
            </div>
            <h1 className={homeStyles.heroTitle}>Your Deep cleaning Service Partner</h1>
            <p className={homeStyles.heroSubtitle}>
              Professional bathroom deep cleaning — floors, walls, basins, commodes, mirrors &amp; ventilators.
            </p>
            <p className={homeStyles.heroSubtitle}>
              Reliable, fast and available 24/7 for your home and office needs.
            </p>
            <div className={homeStyles.heroActions}>
              <button className={homeStyles.bookBtn} onClick={() => setShowBooking(true)}>
                Book a Service
              </button>
              <a href="tel:+8801795180400" className={homeStyles.callBtn}>
                Call Now
              </a>
            </div>
          </div>
        </section>

        <div className={pageStyles.content}>
          {/* ── Description ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>About This Service</h2>
            <p className={pageStyles.sectionText}>{SERVICE.description}</p>
          </section>

          {/* ── What's Included ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>What&apos;s Included</h2>
            <ul className={pageStyles.includesList}>
              {SERVICE.includes.map((item, i) => (
                <li key={i} className={pageStyles.includesItem}>
                  <span className={pageStyles.checkIcon}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* ── Pricing Packages ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>Pricing</h2>
            <div className={pageStyles.packagesGrid}>
              {SERVICE.packages.map((pkg, i) => (
                <div key={i} className={pageStyles.packageCard}>
                  <div className={pageStyles.packageLabel}>{pkg.label}</div>
                  <div className={pageStyles.packageDesc}>{pkg.desc}</div>
                  <div className={pageStyles.packagePrice}>৳{pkg.price.toLocaleString()}</div>
                  <button
                    className={pageStyles.packageBookBtn}
                    onClick={() => handleBook(pkg)}
                  >
                    Book This Package
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQs ── */}
          <section className={pageStyles.section}>
            <h2 className={pageStyles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={pageStyles.faqList}>
              {SERVICE.faqs.map((faq, i) => (
                <div key={i} className={pageStyles.faqItem}>
                  <button
                    className={pageStyles.faqQuestion}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <span className={pageStyles.faqChevron}>{openFaq === i ? '▴' : '▾'}</span>
                  </button>
                  {openFaq === i && (
                    <div className={pageStyles.faqAnswer}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {showBooking && (
        <BookingModal
          initialServiceId={SERVICE.id}
          preselectedPackage={selectedPackage}
          onClose={() => { setShowBooking(false); setSelectedPackage(null); }}
          onBook={(data) => { setShowBooking(false); setSelectedPackage(null); }}
        />
      )}

      {showServices && (
        <ServicesModal
          onClose={() => setShowServices(false)}
          onSelect={(data) => {
            setShowServices(false);
            setShowBooking(true);
          }}
        />
      )}
    </>
  );
}
