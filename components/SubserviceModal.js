import styles from '../styles/BookingModal.module.css';

const SUBSERVICES = [
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
];

export default function SubserviceModal({ onClose, onSelect }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cleaning Services</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className={styles.body}>
          <p className={styles.stepHint}>Choose a cleaning service to continue booking.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SUBSERVICES.map(s => (
              <button
                key={s.id}
                onClick={() => onSelect(s)}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: '#fff',
                  border: '1px solid #e6f8ff',
                  color: '#00345f',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
