import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navigation.module.css';

export default function Navigation({ onBookClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBookNow, setShowBookNow] = useState(false);
  const [bookNowState, setBookNowState] = useState('hidden'); // 'hidden' | 'showing' | 'hiding'

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

  // Drive the visual state for the nav button so we can animate hide/show
  useEffect(() => {
    // durations must match CSS: show expands via transition; hide runs animation then contracts
    const HIDE_ANIM_MS = 1400; // matches CSS navHide (longer settle)
    const CONTRACTION_MS = 700; // matches max-width transition

    if (showBookNow) {
      // immediately show
      setBookNowState('showing');
      return;
    }

    // if it was showing and now should hide, play hiding animation then fully hide
    setBookNowState(prev => (prev === 'showing' ? 'hiding' : 'hidden'));

    if (bookNowState === 'showing' || bookNowState === 'hiding') {
      const total = HIDE_ANIM_MS + CONTRACTION_MS;
      const t = setTimeout(() => setBookNowState('hidden'), total);
      return () => clearTimeout(t);
    }
  }, [showBookNow]);

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
          <Link href="/all-services?category=1" className={styles.link} onClick={() => setMenuOpen(false)}>
            Cleaning service
          </Link>
          <Link href="/all-services?category=2" className={styles.link} onClick={() => setMenuOpen(false)}>
            Pest control service
          </Link>
          <Link href="/all-services?category=3" className={styles.link} onClick={() => setMenuOpen(false)}>
            Shifting Service
          </Link>
          <Link href="/all-services?category=4" className={styles.link} onClick={() => setMenuOpen(false)}>
            AC Service
          </Link>
          <Link href="/all-services?category=5" className={styles.link} onClick={() => setMenuOpen(false)}>
            Construction Service
          </Link>
          <Link href="/news" className={styles.link} onClick={() => setMenuOpen(false)}>
            News &amp; Tips
          </Link>
          <div className={styles.ctaWrap}>
            <a href="/#contact" className={styles.contactBtn} onClick={() => setMenuOpen(false)}>
              Contact Us
            </a>

            <button
              type="button"
              aria-label="Book a Service"
              className={
                `${styles.bookNow} ${bookNowState === 'showing' ? styles.bookNowShow : ''} ${bookNowState === 'hiding' ? styles.bookNowHide : ''}`
              }
              onClick={() => { setMenuOpen(false); if (onBookClick) onBookClick(); }}
              aria-hidden={bookNowState === 'hidden'}
            >
              Book a Service
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
