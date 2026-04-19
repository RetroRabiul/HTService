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
  const [openIds, setOpenIds] = useState([]);
  const [navCollapsed, setNavCollapsed] = useState(false);

  // collapsed visual state when an item is expanded (controlled separately)
  const collapsed = navCollapsed;

  // title style: smaller and wraps up to two lines when two-column (nav visible),
  // medium and single-line with ellipsis when collapsed.
  const titleStyle = collapsed
    ? { marginTop: 0, fontSize: 20, fontWeight: 800, lineHeight: 1.05, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#ffffff' }
    : { marginTop: 0, fontSize: 16, fontWeight: 800, lineHeight: 1.1, whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: '#e6fbff' };

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
    <div style={{ minHeight: '100vh', background: '#0f1626', color: '#fff', overflowX: 'hidden' }}>
      <header style={{ padding: '14px 16px', background: '#1a1b2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Services</h1>
        </div>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Close</Link>
      </header>

      <main style={{ padding: 12 }}>
        <div className={`${styles.servicesBody} ${collapsed ? styles.servicesBodyCollapsed : ''}`}>
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

          <section className={`${styles.servicesRight} ${collapsed ? styles.servicesRightCollapsed : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {collapsed && (
                  <button
                    className={styles.backBtn}
                    onClick={() => {
                      // restore the full two-column view when Back is pressed
                      setOpenIds([]);
                      setNavCollapsed(false);
                    }}
                    aria-label="Back to services"
                    style={{ marginRight: 8, position: 'relative', left: 0 }}
                  >
                    ‹ Back
                  </button>
                )}
                <h2 style={titleStyle}>{main.label}</h2>
            </div>

            {/* list of subservices; show price on right, click card to open details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {main.subs.length === 0 && <div style={{ color: '#9aa3c6' }}>No services listed yet for this category.</div>}
              {main.subs.map(s => {
                const isOpen = openIds.includes(s.id);
                return (
                  <div key={s.id}>
                    <div
                      className={styles.subserviceCardDark}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
                      <button
                        onClick={() => {
                          if (!isOpen) {
                            setOpenIds(prev => [...prev, s.id]);
                            setNavCollapsed(true);
                          } else {
                            setOpenIds(prev => prev.filter(id => id !== s.id));
                          }
                        }}
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${s.name}`}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.06)',
                          color: '#cfeafd',
                          padding: '8px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontSize: 18,
                          lineHeight: 1,
                          transform: isOpen ? 'rotate(180deg)' : 'none'
                        }}
                      >
                        ▾
                      </button>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: 10 }}>
                        <DetailInline id={s.id} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </section>

          {/* right-side slide-in detail panel */}
          <div className={styles.detailPanelContainer}>
            <div className={`${styles.detailPanel} ${inDetail ? styles.detailPanelOpen : ''}`}>
              {inDetail && <DetailView id={detailFor} onBack={() => setDetailFor(null)} />}
            </div>
          </div>
        </div>
      </main>

      {/* no restore button; left nav stays mounted */}
    </div>
  );
}

const DETAILS = {
  101: {
    title: 'Bathroom Deep Cleaning',
    items: [
      { label: 'Only Bathroom = Floor + Wall + Single Basin + Single Pan/Commode + Mirror + ventilator', price: '' },
      { label: 'Only Bathroom', price: '1000' },
      { label: 'Bathroom With Bathtub', price: '1200' },
      { label: 'Bathroom With Shower Corner', price: '1500' },
      { label: 'Bathroom With Bathtub & Shower Corner', price: '1600' }
    ]
  },
  102: {
    title: 'Kitchen Deep Cleaning Service',
    items: [
      { label: 'Only Kitchin = Floor + Wall + Sink + Outside Cabinet + Inside Window + Exist fan', price: '' },
      { label: 'Only Kitchen', price: '1500' },
      { label: 'Kitchen Hood Basic Clean', price: '1000' },
      { label: 'Kitchen Hood Master Clean', price: '2000' }
    ]
  },
  103: {
    title: 'Floor Deep Cleaning',
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
      { label: '800-1000 (2 bathroom+1 Balcony)', price: '৳4,000' },
      { label: '1001-1300 (3 Bathroom+2 balcony)', price: '৳5,000' },
      { label: '1301-1500 (4 bathroom+3 balcony)', price: '৳6,000' },
      { label: '1501-1700 (4 bathroom+4 balcony)', price: '৳7,000' },
      { label: '1701- (Get Quotation)', price: '৳8,000' }
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

function DetailView({ id, onBack }) {
  const data = DETAILS[id] || { title: 'Details', items: [] };

  return (
    <div style={{ minHeight: 120 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#cfeafd', fontSize: 18, cursor: 'pointer' }}>‹ Back</button>
        <div style={{ fontWeight: 900, fontSize: 18 }}>{data.title}</div>
        <div style={{ width: 48 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.items.map((it, idx) => (
          <div key={idx} style={{ background: '#0b1b2a', padding: 12, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 15, fontWeight: it.price ? 700 : 600, color: it.price ? '#fff' : '#cfeafd', flex: 1 }}>{it.label}</div>
              {it.price && <div style={{ color: '#00B4D8', fontWeight: 900, marginLeft: 12 }}>{it.price}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailInline({ id }) {
  const data = DETAILS[id] || { title: 'Details', items: [] };
  return (
    <div style={{ background: '#041220', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.03)' }}>
      <div style={{ fontWeight: 800, marginBottom: 8 }}>{data.title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 8px', borderRadius: 8, background: '#071324' }}>
            <div style={{ color: it.price ? '#fff' : '#cfeafd', fontWeight: it.price ? 700 : 600 }}>{it.label}</div>
            {it.price && <div style={{ color: '#00B4D8', fontWeight: 900 }}>{it.price}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
