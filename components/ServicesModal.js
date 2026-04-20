import { useState } from 'react';
import styles from '../styles/BookingModal.module.css';
import { DETAILS } from '../data/details';

function formatPrice(p) {
  if (p === undefined || p === null || p === '') return '';
  if (typeof p === 'number') return `৳${p.toLocaleString()}`;
  const s = String(p).trim();
  if (s.includes('৳') || s.includes('Tk')) return s;
  if (/^[0-9,]+$/.test(s)) {
    const n = parseInt(s.replace(/,/g, ''), 10);
    return `৳${n.toLocaleString()}`;
  }
  return s;
}

const MAIN_SERVICES = [
  {
    id: 1,
    icon: '🧹',
    label: 'Cleaning service',
    subs: [
      { id: 101, name: 'Bathroom Deep Cleaning', price: 800 },
      { id: 102, name: 'Kitchen Deep Cleaning Service', price: 1200 },
      { id: 103, name: 'Floor Deep Cleaning', price: 1500 },
      { id: 104, name: 'Full Home Deep Cleaning', price: 5000 },
      { id: 105, name: 'Window Cleaning', price: 700 },
      { id: 106, name: 'Thai Glass Cleaning', price: 900 }
    ]
  },
  { id: 2, icon: '🦟', label: 'Pest control service', subs: [] },
  { id: 3, icon: '🚚', label: 'Shifting Service', subs: [] },
  { id: 4, icon: '❄️', label: 'AC Service', subs: [] },
  { id: 5, icon: '🏗️', label: 'Construction Service', subs: [] }
];

export default function ServicesModal({ onClose, onSelect }) {
  const [activeMain, setActiveMain] = useState(MAIN_SERVICES[0].id);
  const [openSubs, setOpenSubs] = useState([]);
  const main = MAIN_SERVICES.find(m => m.id === activeMain) || MAIN_SERVICES[0];

  function toggleSub(id) {
    setOpenSubs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} ${styles.servicesModal}`} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Services</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className={styles.servicesBody}>
          <aside className={styles.servicesLeft}>
            {MAIN_SERVICES.map(m => (
              <button
                key={m.id}
                className={`${styles.serviceNavItem} ${m.id === activeMain ? styles.serviceNavItemActive : ''}`}
                onClick={() => setActiveMain(m.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 20 }}>{m.icon}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>{m.label}</div>
                  </div>
                </div>
              </button>
            ))}
          </aside>

          <section className={styles.servicesRight}>
            <p className={styles.stepHint}>Choose a service to continue booking.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {main.subs.length === 0 && (
                <div style={{ color: '#9aa3c6' }}>No services listed yet for this category.</div>
              )}

              {main.subs.map(s => (
                <div key={s.id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <button
                        className={styles.subserviceItem}
                        type="button"
                        aria-expanded={openSubs.includes(s.id)}
                        onClick={() => toggleSub(s.id)}
                      >
                        {s.name}
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className={styles.groupChevron}
                        aria-expanded={openSubs.includes(s.id)}
                        onClick={() => toggleSub(s.id)}
                      >
                        {openSubs.includes(s.id) ? '▴' : '▾'}
                      </button>
                    </div>
                  </div>

                  {openSubs.includes(s.id) && (
                    <div style={{ marginTop: 8, padding: 12, background: '#071324', borderRadius: 8 }}>
                      {(() => {
                        const data = DETAILS[s.id] || { title: '', items: [] };
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ fontWeight: 800, color: '#e6fbff' }}>{data.title}</div>
                            {data.items.map((it, i) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                                <div style={{ color: it.price ? '#fff' : '#cfeafd', fontWeight: it.price ? 700 : 600 }}>{it.label}</div>
                                {it.price && <div style={{ color: '#8ef0d6', fontWeight: 700 }}>{formatPrice(it.price)}</div>}
                              </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                              <button className={styles.nextBtn} onClick={() => onSelect(s)}>Book</button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
