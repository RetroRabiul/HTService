import styles from '../styles/BookingModal.module.css';

const SUBSERVICES = [
  'Bathroom Deep Cleaning',
  'Kitchen Deep Cleaning Service',
  'Floor Deep Cleaning (4 Options available)',
  'Full Home Deep Cleaning',
  'Window Cleaning',
  'Thai Glass Cleaning (2 Options available)'
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
                key={s}
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
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
