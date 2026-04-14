import Navigation from '../components/Navigation';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navigation />
      <main style={{fontFamily: 'Inter, system-ui, Arial', minHeight: '100vh', background: 'linear-gradient(to bottom, #f0f9ff, #ffffff)'}}>
        {/* Hero Section with Background Image */}
        <section style={{
          position: 'relative',
          textAlign: 'center',
          padding: '120px 20px 80px',
          background: 'linear-gradient(135deg, rgba(0,64,128,0.95) 0%, rgba(0,102,204,0.9) 100%)',
          color: 'white',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
            zIndex: 0
          }}>
            <Image 
              src="/home_page/ht_bg.png" 
              alt="Cleaning services background"
              fill
              style={{objectFit: 'cover'}}
            />
          </div>
          <div style={{position: 'relative', zIndex: 1}}>
            <h1 style={{fontSize: 56, fontWeight: 700, marginBottom: 20, textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
              Professional Cleaning Services in Dhaka
            </h1>
            <p style={{fontSize: 22, maxWidth: 800, margin: '0 auto 40px', lineHeight: 1.7, textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>
              Your trusted partner for spotless homes and offices. HT Service brings professional cleaning excellence to Dhaka, Bangladesh.
            </p>
            <a href="#contact" style={{
              display: 'inline-block',
              padding: '18px 40px',
              background: '#00B4D8',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(0,180,216,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}>
              Get a Free Quote
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section style={{padding: '80px 20px', background: '#ffffff'}}>
          <h2 style={{fontSize: 42, textAlign: 'center', marginBottom: 16, color: '#004080', fontWeight: 700}}>Our Services</h2>
          <p style={{textAlign: 'center', fontSize: 18, color: '#666', marginBottom: 60, maxWidth: 600, margin: '0 auto 60px'}}>
            Comprehensive cleaning solutions tailored to your needs
          </p>
          <div style={{display: 'flex', gap: 32, maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center'}}>
            <ServiceCard 
              title="Residential Cleaning" 
              description="Deep cleaning for homes, apartments, and condos. Keep your living space fresh and healthy."
              icon="🏠"
            />
            <ServiceCard 
              title="Office Cleaning" 
              description="Maintain a professional and productive workplace with our commercial cleaning services."
              icon="🏢"
            />
            <ServiceCard 
              title="Pest Prevention" 
              description="Specialized cleaning to reduce mosquitoes and prevent pest infestations in your home."
              icon="🦟"
            />
            <ServiceCard 
              title="Deep Sanitization" 
              description="Thorough sanitization services for a healthier, germ-free environment."
              icon="✨"
            />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section style={{padding: '80px 20px', background: '#f8fafc'}}>
          <h2 style={{fontSize: 42, textAlign: 'center', marginBottom: 60, color: '#004080', fontWeight: 700}}>Why Choose HT Service?</h2>
          <div style={{maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40}}>
            <Feature title="Professional Team" description="Trained and experienced cleaning specialists" />
            <Feature title="Eco-Friendly Products" description="Safe for your family and the environment" />
            <Feature title="Affordable Rates" description="Quality service at competitive prices" />
            <Feature title="Flexible Scheduling" description="We work around your schedule" />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #004080 0%, #0066cc 100%)', color: 'white'}}>
          <h2 style={{fontSize: 42, marginBottom: 20, fontWeight: 700}}>Ready to Get Started?</h2>
          <p style={{fontSize: 20, marginBottom: 40, opacity: 0.95}}>Contact HT Service today for a free consultation and quote.</p>
          <div style={{maxWidth: 600, margin: '0 auto 40px', background: 'rgba(255,255,255,0.1)', padding: 30, borderRadius: 12}}>
            <h3 style={{fontSize: 24, marginBottom: 20}}>HT Service</h3>
            <p style={{fontSize: 18, marginBottom: 10}}>📍 Dhaka, Bangladesh</p>
            <p style={{fontSize: 18, marginBottom: 10}}>📞 Contact us for inquiries</p>
            <p style={{fontSize: 18}}>✉️ info@htservice.com</p>
          </div>
          <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="tel:+880" style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: '#00B4D8',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,180,216,0.3)',
              transition: 'transform 0.2s'
            }}>
              Call Now
            </a>
            <a href="mailto:info@htservice.com" style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: 'white',
              color: '#004080',
              fontSize: 18,
              fontWeight: 600,
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
              transition: 'transform 0.2s'
            }}>
              Email Us
            </a>
          </div>
        </section>

        <footer style={{padding: '40px 20px', textAlign: 'center', background: '#001a33', color: '#94a3b8'}}>
          <p style={{marginBottom: 8}}>HT Service - House to Service by Khan</p>
          <small>&copy; 2026 HT Service. All rights reserved. Serving Dhaka, Bangladesh.</small>
        </footer>
      </main>
    </>
  );
}

function ServiceCard({ title, description, icon }) {
  return (
    <div style={{
      flex: '1 1 260px',
      maxWidth: 300,
      padding: 36,
      background: 'white',
      border: '2px solid #e8f4f8',
      borderRadius: 16,
      boxShadow: '0 4px 12px rgba(0,64,128,0.08)',
      textAlign: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,180,216,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,64,128,0.08)';
    }}>
      <div style={{fontSize: 48, marginBottom: 16}}>{icon}</div>
      <h3 style={{fontSize: 22, fontWeight: 600, marginBottom: 12, color: '#004080'}}>{title}</h3>
      <p style={{fontSize: 16, color: '#64748b', lineHeight: 1.6}}>{description}</p>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div style={{textAlign: 'center'}}>
      <h3 style={{fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#004080'}}>{title}</h3>
      <p style={{fontSize: 16, color: '#64748b', lineHeight: 1.6}}>{description}</p>
    </div>
  );
}
