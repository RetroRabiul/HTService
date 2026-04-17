import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navigation.module.css';

export default function Navigation({ onBookClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);

  useEffect(() => {
    function checkHeroButton() {
      try {
        const btn = document.getElementById('hero-book-btn');
        if (!btn) { setShowBookNow(false); return; }
        const rect = btn.getBoundingClientRect();
        // show when the button is scrolled above or below the viewport (out of view)
        setShowBookNow(rect.bottom < 0 || rect.top > window.innerHeight);
      } catch (e) {
        setShowBookNow(false);
      }
    }

    checkHeroButton();
    window.addEventListener('scroll', checkHeroButton, { passive: true });
    window.addEventListener('resize', checkHeroButton);
    return () => {
      window.removeEventListener('scroll', checkHeroButton);
      window.removeEventListener('resize', checkHeroButton);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/home_page/logo.jpg"
            alt="HT Service Logo"
            width={160}
            height={64}
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

          <button
            type="button"
            className={`${styles.bookNow} ${showBookNow ? styles.bookNowShow : ''}`}
            onClick={() => { setMenuOpen(false); if (onBookClick) onBookClick(); }}
            aria-hidden={!showBookNow}
          >
            Book a Cleaning
          </button>
        </div>
      </div>
    </nav>
  );
}
