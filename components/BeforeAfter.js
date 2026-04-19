import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/News.module.css';

export default function BeforeAfter({ beforeSrc, afterSrc, alt }) {
  const containerRef = useRef(null);
  const [split, setSplit] = useState(50);
  const draggingRef = useRef(false);

  useEffect(() => {
    function onMove(e) {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      setSplit(pct);
    }

    function onUp() {
      draggingRef.current = false;
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  function startDrag(e) {
    draggingRef.current = true;
    e.preventDefault();
  }

  return (
    <div className={styles.baContainer} ref={containerRef}>
      <div className={styles.baImageAfter}>
        <Image src={afterSrc} alt={alt + ' after'} fill style={{ objectFit: 'cover' }} />
      </div>

      <div className={styles.baImageBefore} style={{ width: `${split}%` }}>
        <Image src={beforeSrc} alt={alt + ' before'} fill style={{ objectFit: 'cover' }} />
      </div>

      <div
        className={styles.baHandle}
        style={{ left: `${split}%` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        role="presentation"
      >
        <div className={styles.baHandleDot} />
      </div>

      <input
        className={styles.baRange}
        type="range"
        min="0"
        max="100"
        value={Math.round(split)}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label="Compare before and after"
      />
    </div>
  );
}
