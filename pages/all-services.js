import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
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

  return (
    <div style={{ minHeight: '100vh', background: '#0f1626', color: '#fff' }}>
      <header style={{ padding: '14px 16px', background: '#1a1b2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>Services</h1>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Close</Link>
      </header>

      <main style={{ padding: 12 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <nav style={{ minWidth: 140, maxWidth: 220 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MAIN_SERVICES.map(m => (
                <button
                  key={m.id}
                  onClick={() => router.push(`/all-services?category=${m.id}`)}
                  style={{
                    background: m.id === activeId ? '#0d2338' : 'transparent',
                    color: '#fff',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ fontSize: 18 }}>{m.icon}</div>
                    <div style={{ fontWeight: 700 }}>{m.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </nav>

          <section style={{ flex: 1 }}>
            <h2 style={{ marginTop: 0 }}>{main.label}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {main.subs.length === 0 && <div style={{ color: '#9aa3c6' }}>No services listed yet for this category.</div>}
              {main.subs.map(s => (
                <div key={s.id} style={{ background: '#111827', padding: 12, borderRadius: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{s.name}</div>
                    </div>
                    <div style={{ color: '#00B4D8', fontWeight: 800 }}>Tk {s.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
