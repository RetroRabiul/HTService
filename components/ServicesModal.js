import { useState } from 'react';
import styles from '../styles/BookingModal.module.css';
import { DETAILS } from '../data/details';
import { useBooking } from '../contexts/BookingContext';

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
  const bookingCtx = useBooking();
  const [activeMain, setActiveMain] = useState(MAIN_SERVICES[0].id);
  const [openSubs, setOpenSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const main = MAIN_SERVICES.find(m => m.id === activeMain) || MAIN_SERVICES[0];

  function toggleSub(id) {
    setOpenSubs(prev => {
      const opening = !prev.includes(id);
      const next = opening ? [...prev, id] : prev.filter(x => x !== id);
      // track last selected/expanded sub for booking
      if (opening) setSelectedSub(id);
      else if (selectedSub === id) setSelectedSub(null);
      return next;
    });
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
            <div className={styles.servicesRightInner}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {main.subs.length === 0 && (
                <div style={{ color: '#9aa3c6' }}>No services listed yet for this category.</div>
              )}

              {main.subs.map(s => (
                <div key={s.id}>
                  <div style={{ marginBottom: 6 }}>
                    <button
                      className={styles.subserviceItem}
                      type="button"
                      aria-expanded={openSubs.includes(s.id)}
                      onClick={() => toggleSub(s.id)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
                    >
                      <span style={{ textAlign: 'left', flex: 1 }}>{s.name}</span>
                      <span className={styles.groupChevron} aria-hidden style={{ marginLeft: 12 }}>
                        {openSubs.includes(s.id) ? '▴' : '▾'}
                      </span>
                    </button>
                  </div>

                  {openSubs.includes(s.id) && (
                    <div style={{ marginTop: 8, padding: 12, background: '#071324', borderRadius: 8 }}>
                      {(() => {
                        const data = DETAILS[s.id] || { title: '', items: [] };
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ fontWeight: 800, color: '#e6fbff' }}>{data.title}</div>
                            {data.items.map((it, i) => {
                              const hasPrice = !!it.price;
                              const checked = bookingCtx && bookingCtx.selections && bookingCtx.selections[s.id] && bookingCtx.selections[s.id].includes(i);
                              return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                                  <div style={{ color: hasPrice ? '#fff' : '#cfeafd', fontWeight: hasPrice ? 700 : 600 }}>{it.label}</div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {hasPrice && <div style={{ color: '#8ef0d6', fontWeight: 700 }}>{formatPrice(it.price)}</div>}
                                    {hasPrice && (
                                      <button
                                        type="button"
                                        aria-pressed={!!checked}
                                        onClick={() => bookingCtx.toggleSelection(Number(s.id), i)}
                                        className={checked ? styles.checkboxChecked : styles.checkbox}
                                      >
                                        {checked ? '✓' : ''}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            {/* Book button moved to modal footer; keep details read-only here */}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>

            {/* Book button inside right column (below scrollable content) */}
            <div style={{ marginTop: 12, paddingTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className={styles.nextBtn}
                  style={{ width: 220 }}
                  disabled={!selectedSub && !(bookingCtx && Object.keys(bookingCtx.selections || {}).length)}
                  onClick={() => {
                    if (selectedSub) {
                      const subObj = main.subs.find(x => x.id === selectedSub);
                      onSelect(subObj || { id: selectedSub });
                    } else if (bookingCtx) {
                      onSelect({ id: main.id });
                    }
                  }}
                >
                  Book Selected
                </button>
              </div>
            </div>
          </section>
        </div>
        
      </div>
    </div>
  );
}
