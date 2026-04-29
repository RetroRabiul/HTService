import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
      { id: 101, name: 'Bathroom Deep Cleaning', price: 1000 },
      { id: 102, name: 'Kitchen Deep Cleaning Service', price: 1500 },
      { id: 103, name: 'Floor Deep Cleaning', price: 3 },
      { id: 104, name: 'Full Home Deep Cleaning', price: 4000 },
      { id: 105, name: 'Window Cleaning', price: 200 },
      { id: 106, name: 'Thai Glass Cleaning', price: 4 },
      { id: 107, name: 'Furniture & Carpet Cleaning', price: 8 },
      { id: 108, name: 'Marble & Mosaic Cutting and Polish', price: 30 },
      { id: 109, name: 'Appliance Cleaning', price: 200 },
      { id: 110, name: 'Tank & Pipe Cleaning', price: 1500 },
      { id: 111, name: 'Monthly Service', price: 14000 },
    ],
  },
  {
    id: 2,
    icon: '🦟',
    label: 'Pest control service',
    subs: [
      { id: 201, name: 'Cockroaches Control', price: 3000 },
      { id: 202, name: 'Bed Bugs Control', price: 2000 },
      { id: 203, name: 'Termite Control', price: 250 },
      { id: 204, name: 'Rodent Control Premium Service', price: 250 },
    ],
  },
  {
    id: 3,
    icon: '🚚',
    label: 'Shifting Service',
    subs: [
      { id: 301, name: 'Family Home Shifting', price: 250 },
      { id: 302, name: 'Bachelor Home Shifting', price: 250 },
      { id: 303, name: 'Office Shifting', price: 250 },
    ],
  },
  {
    id: 4,
    icon: '❄️',
    label: 'AC Service',
    subs: [
      { id: 401, name: 'AC Check Up', price: 300 },
      { id: 402, name: 'AC Gas Checkup Service', price: 400 },
      { id: 403, name: 'AC Jet Wash', price: 800 },
      { id: 404, name: 'AC Master Service', price: 1300 },
      { id: 405, name: 'AC Foam Wash', price: 1500 },
      { id: 406, name: 'AC Water Drop Solution', price: 1200 },
    ],
  },
  { id: 5, icon: '🏗️', label: 'Construction Service', subs: [] },
];

export default function ServicesModal({ onClose, onSelect }) {
  const bookingCtx = useBooking();
  const router = useRouter();
  const [activeMain, setActiveMain] = useState(MAIN_SERVICES[0].id);
  const [slugMap, setSlugMap] = useState({});
  const main = MAIN_SERVICES.find(m => m.id === activeMain) || MAIN_SERVICES[0];

  useEffect(() => {
    async function loadSlugs() {
      try {
        const res = await fetch('/info/services.json');
        const data = await res.json();
        const map = {};
        (data.business_services || []).forEach(bs => {
          (bs.subcategories || []).forEach(sc => {
            if (sc && sc.name && sc.slug) {
              map[String(sc.name).trim().toLowerCase()] = String(sc.slug).trim();
            }
          });
        });
        setSlugMap(map);
      } catch (e) {
        // ignore
      }
    }
    loadSlugs();
  }, []);

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
                      onClick={() => {
                        const slug = slugMap[String(s.name).trim().toLowerCase()];
                        if (slug) {
                          router.push(`/${slug}`);
                          onClose && onClose();
                          return;
                        }
                        // fallback: do nothing
                      }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}
                    >
                      <span style={{ textAlign: 'left', flex: 1 }}>{s.name}</span>
                    </button>
                  </div>
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
                  disabled={!(selectedSub || (bookingCtx && bookingCtx.getSelectedCount && bookingCtx.getSelectedCount() > 0))}
                  onClick={() => {
                    const selectedItems = bookingCtx && bookingCtx.getSelectedItems ? bookingCtx.getSelectedItems() : [];
                    if (selectedItems && selectedItems.length > 0) {
                      onSelect({ preselectedItems: selectedItems, startStep: 1 });
                    } else if (selectedSub) {
                      const subObj = main.subs.find(x => x.id === selectedSub);
                      onSelect(subObj || { id: selectedSub });
                    } else {
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
