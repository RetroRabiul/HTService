import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/BookingModal.module.css';

const MAIN_SERVICES = [
  {
    id: 1,
    icon: '🧹',
    label: 'Cleaning service',
    subs: [
      { id: 101, name: 'Bathroom Deep Cleaning', price: 800 },
      { id: 102, name: 'Kitchen Deep Cleaning Service', price: 1200 },
      { id: 103, name: 'Floor Deep Cleaning (4 Options available)', price: 1500 },
      { id: 104, name: 'Full Home Deep Cleaning', price: 5000 },
      { id: 105, name: 'Window Cleaning', price: 700 },
      { id: 106, name: 'Thai Glass Cleaning (2 Options available)', price: 900 }
    ]
  },
  { id: 2, icon: '🦟', label: 'Pest control service', subs: [] },
  { id: 3, icon: '🚚', label: 'Shifting Service', subs: [] },
  { id: 4, icon: '❄️', label: 'AC Service', subs: [] },
  { id: 5, icon: '🏗️', label: 'Construction Service', subs: [] }
];

export default function AllServices() {
  const router = useRouter();
  const { category } = router.query;
  const activeId = Number(category) || 1;
  const main = MAIN_SERVICES.find(m => m.id === activeId) || MAIN_SERVICES[0];
  const [detailFor, setDetailFor] = useState(null); // subservice id
  const inDetail = detailFor !== null;

  // helper to split label into two lines (first word and rest)
  function renderLabelSplit(label) {
    const parts = label.split(' ');
    const first = parts[0] || '';
    const rest = parts.slice(1).join(' ') || '';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 800 }}>{first}</div>
        {rest && <div style={{ fontSize: 14, fontWeight: 700, color: '#cfeafd' }}>{rest}</div>}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f1626', color: '#fff' }}>
      <header style={{ padding: '14px 16px', background: '#1a1b2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Services</h1>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Close</Link>
      </header>

      <main style={{ padding: 12 }}>
        <div className={`${styles.servicesBody} ${inDetail ? styles.servicesBodyCollapsed : ''}`}>
          <nav className={styles.servicesLeft}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MAIN_SERVICES.map(m => (
                <button
                  key={m.id}
                  onClick={() => router.push(`/all-services?category=${m.id}`)}
                  className={`${styles.serviceNavItem} ${m.id === activeId ? styles.serviceNavItemActive : ''}`}
                >
                  <div style={{ fontSize: 20 }}>{m.icon}</div>
                  {renderLabelSplit(m.label)}
                </button>
              ))}
            </div>
          </nav>

          <section className={styles.servicesRight}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ marginTop: 0, fontSize: 28, fontWeight: 900, lineHeight: 1.05 }}>{renderLabelSplit(main.label)}</h2>
            </div>

            {/* list of subservices; no prices shown, add chevron button to drill in */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {main.subs.length === 0 && <div style={{ color: '#9aa3c6' }}>No services listed yet for this category.</div>}
              {main.subs.map(s => (
                <div key={s.id} className={styles.subserviceItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
                  <button
                    onClick={() => setDetailFor(s.id)}
                    aria-label={`Open ${s.name}`}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: '#cfeafd',
                      padding: '8px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 18,
                      lineHeight: 1
                    }}
                  >
                    &gt;
                  </button>
                </div>
              ))}
            </div>

            {/* detail drawer */}
            {inDetail && (
              <DetailView id={detailFor} onBack={() => setDetailFor(null)} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function DetailView({ id, onBack }) {
  // content mapping based on id
  const DETAILS = {
    101: {
      title: 'Bathroom Deep Cleaning',
      items: [
        { label: 'Only Bathroom = Floor + Wall + Single Basin + Single Pan/Commode + Mirror + ventilator', price: '1000' },
        { label: 'Bathroom With Bathtub', price: '1200' },
        { label: 'Bathroom With Shower Corner', price: '1500' },
        { label: 'Bathroom With Bathtub & Shower Corner', price: '1600' }
      ]
    },
    102: {
      title: 'Kitchen Deep Cleaning Service',
      items: [
        { label: 'Only Kitchen = Floor + Wall + Sink + Outside Cabinet + Inside Window + Exhaust fan', price: '1500' },
        { label: 'Kitchen Hood Basic Clean', price: '1000' },
        { label: 'Kitchen Hood Master Clean', price: '2000' }
      ]
    },
    103: {
      title: 'Floor Deep Cleaning (4 Options)',
      items: [
        { label: 'Tiles', price: '৳3/Sft' },
        { label: 'Mosaic', price: '৳4/Sft' },
        { label: 'Marble', price: '৳5/Sft' },
        { label: 'Wooden', price: '৳10/Sft' }
      ]
    },
    104: {
      title: 'Full Home Deep Cleaning',
      items: [
        { label: '800-1000 (2 bathroom+1 Balcony) ৳4,000', price: '' },
        { label: '1001-1300 (3 Bathroom+2 balcony) ৳5,000', price: '' },
        { label: '1301-1500 (4 bathroom+3 balcony) ৳6,000', price: '' },
        { label: '1501-1700 (4 bathroom+4 balcony) ৳7,000', price: '' },
        { label: '1701- (Get Quotation) ৳8,000', price: '' }
      ]
    },
    105: {
      title: 'Window Cleaning',
      items: [
        { label: 'Inside Window Cleaning (Minimum 5 Window)', price: '৳200' },
        { label: 'Outside Window Cleaning (Minimum 5 Window)', price: '৳800' }
      ]
    },
    106: {
      title: 'Thai Glass Cleaning',
      items: [
        { label: 'Indoor Glass', price: '৳4/Sft' },
        { label: 'Outdoor Glass', price: '৳8/Sft' }
      ]
    }
  };

  const data = DETAILS[id] || { title: 'Details', items: [] };

  return (
    <div style={{ marginTop: 16, background: '#071324', padding: 12, borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#cfeafd', fontSize: 18, cursor: 'pointer' }}>‹ Back</button>
        <div style={{ fontWeight: 900, fontSize: 18 }}>{data.title}</div>
        <div style={{ width: 48 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.items.map((it, idx) => (
          <div key={idx} style={{ background: '#0b1b2a', padding: 12, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{it.label}</div>
              {it.price && <div style={{ color: '#00B4D8', fontWeight: 900 }}>{it.price}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
