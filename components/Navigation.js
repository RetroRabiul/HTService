import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/home_page/logo.jpg"
            alt="HT Service Logo"
            width={120}
            height={50}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.line} ${menuOpen ? styles.lineOpen1 : ''}`} />
          <span className={`${styles.line} ${menuOpen ? styles.lineOpen2 : ''}`} />
          <span className={`${styles.line} ${menuOpen ? styles.lineOpen3 : ''}`} />
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          <Link href="/" className={styles.link} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/news" className={styles.link} onClick={() => setMenuOpen(false)}>
            News &amp; Tips
          </Link>
          <a href="/#contact" className={styles.contactBtn} onClick={() => setMenuOpen(false)}>
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
