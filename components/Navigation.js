import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #004080 0%, #0066cc 100%)',
      padding: '16px 40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/" style={{display: 'flex', alignItems: 'center'}}>
          <Image 
            src="/home_page/logo.jpg" 
            alt="HT Service Logo" 
            width={120} 
            height={50}
            style={{objectFit: 'contain'}}
          />
        </Link>
        
        <div style={{display: 'flex', gap: '32px', alignItems: 'center'}}>
          <Link href="/" style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'color 0.2s',
            ':hover': {color: '#00B4D8'}
          }}>
            Home
          </Link>
          <Link href="/news" style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}>
            News & Tips
          </Link>
          <a href="#contact" style={{
            background: '#00B4D8',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 12px rgba(0,180,216,0.3)'
          }}>
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
