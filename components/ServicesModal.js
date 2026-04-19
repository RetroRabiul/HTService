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

export default function ServicesModal({ onClose, onSelect }) {
  const [activeMain, setActiveMain] = useState(MAIN_SERVICES[0].id);
  const main = MAIN_SERVICES.find(m => m.id === activeMain) || MAIN_SERVICES[0];

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {main.subs.length === 0 && (
                <div style={{ color: '#9aa3c6' }}>No services listed yet for this category.</div>
              )}
              {main.subs.map(s => (
                <button
                  key={s.id}
                  className={styles.subserviceItem}
                  onClick={() => onSelect(s)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
