import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/BookingModal.module.css';

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

export default function AllServices() {
  const router = useRouter();
  const { category } = router.query;
  const activeId = Number(category) || 1;
  const main = MAIN_SERVICES.find(m => m.id === activeId) || MAIN_SERVICES[0];

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
        <div className={styles.servicesBody}>
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
            <h2 style={{ marginTop: 0, fontSize: 18, fontWeight: 800, color: '#e6fbff', marginBottom: 16 }}>{main.label}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {main.subs.length === 0 && <div style={{ color: '#9aa3c6' }}>No services listed yet for this category.</div>}
              {main.subs.map(s => (
                <div
                  key={s.id}
                  className={styles.subserviceCardDark}
                  role="button"
                  tabIndex={0}
                  onClick={() => SERVICE_PAGES[s.id] && router.push(SERVICE_PAGES[s.id])}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      SERVICE_PAGES[s.id] && router.push(SERVICE_PAGES[s.id]);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
