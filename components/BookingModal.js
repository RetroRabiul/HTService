import { useState, useEffect } from 'react';
import styles from '../styles/BookingModal.module.css';

const SERVICE_GROUPS = [
  {
    id: 'bathroom',
    name: 'Bathroom Deep Clean',
    items: [
      { id: 101, name: 'Only Bathroom', desc: 'Floor + Wall + Single Basin + Single Pan/Commode + Mirror + Ventilator', price: 1000 },
      { id: 102, name: 'With Bathtub', desc: 'Bathroom with bathtub', price: 1200 },
      { id: 103, name: 'With Shower Corner', desc: 'Bathroom with shower corner', price: 1500 },
      { id: 104, name: 'Bathtub & Shower Corner', desc: 'Bathtub & shower corner', price: 1600 },
    ],
  },
  {
    id: 'kitchen',
    name: 'Kitchen Deep Clean',
    items: [
      { id: 111, name: 'Only Kitchen', desc: 'Floor + Wall + Sink + Outside Cabinet + Inside Window + Exhaust fan', price: 1500 },
      { id: 112, name: 'Hood - Basic Clean', desc: 'Kitchen hood basic clean', price: 1000 },
      { id: 113, name: 'Hood - Master Clean', desc: 'Kitchen hood master clean', price: 2000 },
    ],
  },
  {
    id: 'floor',
    name: 'Floor Deep Cleaning (per Sft)',
    items: [
      { id: 121, name: 'Tiles', desc: 'Tiles deep cleaning', pricePerSft: 3, priceLabel: 'Tk 3/Sft' },
      { id: 122, name: 'Mosaic', desc: 'Mosaic deep cleaning', pricePerSft: 4, priceLabel: 'Tk 4/Sft' },
      { id: 123, name: 'Marble', desc: 'Marble deep cleaning', pricePerSft: 5, priceLabel: 'Tk 5/Sft' },
      { id: 124, name: 'Wooden', desc: 'Wooden floor deep cleaning', pricePerSft: 10, priceLabel: 'Tk 10/Sft' },
    ],
  },
  {
    id: 'fullhome',
    name: 'Full Home Deep Cleaning',
    items: [
      { id: 131, name: '800-1000 (2 bathroom+1 Balcony)', desc: '', price: 4000 },
      { id: 132, name: '1001-1300 (3 bathroom+2 Balcony)', desc: '', price: 5000 },
      { id: 133, name: '1301-1500 (4 bathroom+3 Balcony)', desc: '', price: 6000 },
      { id: 134, name: '1501-1700 (4 bathroom+4 Balcony)', desc: '', price: 7000 },
      { id: 135, name: '1701+ (Get Quotation)', desc: '', price: 8000 },
    ],
  },
  {
    id: 'window',
    name: 'Window Cleaning',
    items: [
      { id: 141, name: 'Inside Window Cleaning (min 5)', desc: 'Inside window cleaning, minimum 5 windows', price: 200 },
      { id: 142, name: 'Outside Window Cleaning (min 5)', desc: 'Outside window cleaning, minimum 5 windows', price: 800 },
    ],
  },
  {
    id: 'thaiglass',
    name: 'Thai Glass Cleaning',
    items: [
      { id: 151, name: 'Indoor Glass (per Sft)', desc: 'Indoor glass cleaning', pricePerSft: 4, priceLabel: 'Tk 4/Sft' },
      { id: 152, name: 'Outdoor Glass (per Sft)', desc: 'Outdoor glass cleaning', pricePerSft: 8, priceLabel: 'Tk 8/Sft' },
    ],
  },
  {
    id: 'pest',
    name: 'Pest control service',
    items: [
      { id: 201, name: 'Mosquito Treatment (single)', desc: 'Standard mosquito treatment for single room', price: 1200 },
      { id: 202, name: 'Home Spray (standard)', desc: 'Whole-home spray treatment', price: 1800 },
      { id: 203, name: 'Rodent Control', desc: 'Rodent baiting and inspection', price: 2500 },
    ],
  },
  {
    id: 'shifting',
    name: 'Shifting Service',
    items: [
      { id: 211, name: 'Local Moving', desc: 'Local small-load moving', price: 2500 },
      { id: 212, name: 'Full Packing & Shift', desc: 'Packing, loading and shifting assistance', price: 4500 },
    ],
  },
  {
    id: 'ac',
    name: 'AC Service',
    items: [
      { id: 221, name: 'AC Maintenance', desc: 'AC maintenance and servicing', price: 2500 },
      { id: 222, name: 'AC Gas Refill', desc: 'Gas refill and leak check', price: 3200 },
    ],
  },
  {
    id: 'construction',
    name: 'Construction Service',
    items: [
      { id: 231, name: 'Post-construction - Small', desc: 'Light debris removal + cleaning', price: 3500 },
      { id: 232, name: 'Post-construction - Large', desc: 'Heavy debris removal + deep clean', price: 6000 },
    ],
  },
];

const ALL_SERVICES = SERVICE_GROUPS.flatMap(g => g.items);

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const TIME_SLOTS = [
  '8:00 AM','8:30 AM','9:00 AM','9:30 AM',
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM','12:30 PM','1:00 PM','1:30 PM',
  '2:00 PM','2:30 PM','3:00 PM','3:30 PM',
  '4:00 PM','4:30 PM','5:00 PM','5:30 PM',
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function BookingModal({ onClose, onBook, initialSelected = null }) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);
  const [step, setStep] = useState(initialSelected ? 2 : 1);
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selDate, setSelDate] = useState({ year: now.getFullYear(), month: now.getMonth(), day: now.getDate() });
  const [selTime, setSelTime] = useState(null);
  const [selectedIds, setSelectedIds] = useState(initialSelected ? [initialSelected] : []);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [cleaningOpen, setCleaningOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState(() => {
    const map = {};
    SERVICE_GROUPS.forEach(g => { map[g.id] = true; });
    return map;
  });

  function toggleGroup(id) {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const formValid = form.name.trim() && form.phone.trim() && form.address.trim();

  // Update selection if initialSelected changes while modal is open
  useEffect(() => {
    if (initialSelected) {
      setSelectedIds([initialSelected]);
      setStep(2);
    } else {
      setSelectedIds([]);
    }
  }, [initialSelected]);

  const numDays = getDaysInMonth(calYear, calMonth);
  const startDay = getFirstDay(calYear, calMonth);
  const pickedServices = ALL_SERVICES.filter(s => selectedIds.includes(s.id));
  const total = pickedServices.reduce((sum, s) => {
    if (typeof s.price === 'number') return sum + s.price;
    return sum; // skip per-sqft or unknown-priced items from automatic total
  }, 0);

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  }
  function toggleService(id) {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const friendlyDate = selDate
    ? `${DAY_NAMES[new Date(selDate.year, selDate.month, selDate.day).getDay()]}, ${MONTHS[selDate.month].slice(0, 3)} ${selDate.day}, ${selDate.year}`
    : '';

  function handleSubmit() {
    const bookingData = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
      time: selTime,
      date: friendlyDate,
      services: pickedServices,
      total,
    };

    // Fire Facebook Messenger notification in the background (non-blocking)
    fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    }).catch(err => console.error('Booking notification error:', err));

    onBook(bookingData);
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Always-visible floating close button */}
      <button className={styles.floatClose} onClick={onClose} aria-label="Close booking">
        &#10005;
      </button>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          {step > 1 && (
            <button className={styles.backBtn} onClick={() => setStep(s => s - 1)} aria-label="Go back">
              &#8592;
            </button>
          )}
          <h2 className={styles.title}>
            {step === 1 && 'Request date & time'}
            {step === 2 && 'Select services'}
            {step === 3 && 'Review request'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">&#10005;</button>
        </div>

        <div className={styles.body}>

          {/* ── Step 1: Date & Time ── */}
          {step === 1 && (
            <>
              <div className={styles.calendar}>
                <div className={styles.calHeader}>
                  <button className={styles.calNav} onClick={prevMonth}>&#8249;</button>
                  <span className={styles.calMonth}>{MONTHS[calMonth]} {calYear}</span>
                  <button className={styles.calNav} onClick={nextMonth}>&#8250;</button>
                </div>
                <div className={styles.calGrid}>
                  {DAY_NAMES.map(d => (
                    <div key={d} className={styles.calDayName}>{d}</div>
                  ))}
                  {Array(startDay).fill(null).map((_, i) => <div key={'b' + i} />)}
                  {Array(numDays).fill(null).map((_, i) => {
                    const day = i + 1;
                    const isPast = new Date(calYear, calMonth, day) < todayStart;
                    const isSel = selDate && selDate.year === calYear && selDate.month === calMonth && selDate.day === day;
                    return (
                      <button
                        key={day}
                        className={[styles.calDay, isSel && styles.calSelected, isPast && styles.calPast].filter(Boolean).join(' ')}
                        onClick={() => !isPast && setSelDate({ year: calYear, month: calMonth, day })}
                        disabled={isPast}
                        aria-pressed={isSel}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className={styles.timezone}>All times are in Asia/Dhaka (UTC+06)</p>

              <div className={styles.timeGrid}>
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    className={[styles.timeSlot, selTime === t && styles.timeSelected].filter(Boolean).join(' ')}
                    onClick={() => setSelTime(t)}
                    aria-pressed={selTime === t}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                className={styles.nextBtn}
                disabled={!selTime}
                onClick={() => setStep(2)}
              >
                Next
              </button>
              <p className={styles.footerNote}>
                HT Service will need to approve your proposed date and time in order to confirm your appointment.
              </p>
            </>
          )}

          {/* ── Step 2: Services ── */}
          {step === 2 && (
            <>
              <p className={styles.stepHint}>Select one or more services. You can choose multiple.</p>
              <div className={styles.serviceList}>
                <div className={styles.serviceCategory}>
                  <div className={styles.serviceCategoryTitle}>
                    <span>Cleaning Service</span>
                    <button
                      className={styles.collapseBtn}
                      onClick={() => setCleaningOpen(v => !v)}
                      aria-expanded={cleaningOpen}
                      aria-controls="cleaning-subgroups"
                      type="button"
                    >
                      {cleaningOpen ? '▾' : '+'}
                    </button>
                  </div>
                    {cleaningOpen && (
                      <div id="cleaning-subgroups" className={styles.serviceCategoryInner}>
                        {['bathroom','kitchen','floor','fullhome','window','thaiglass'].map(gid => {
                          const group = SERVICE_GROUPS.find(x => x.id === gid);
                          if (!group) return null;
                          return (
                            <div key={group.id} className={styles.serviceGroup}>
                              <div className={styles.serviceGroupTitle}>{group.name}</div>
                              <div className={styles.nestedList}>
                                {group.items.map(s => {
                                  const checked = selectedIds.includes(s.id);
                                  return (
                                    <div
                                      key={s.id}
                                      className={[styles.serviceItem, checked && styles.serviceSelected].filter(Boolean).join(' ')}
                                      onClick={() => toggleService(s.id)}
                                      role="checkbox"
                                      aria-checked={checked}
                                      tabIndex={0}
                                      onKeyDown={e => e.key === 'Enter' && toggleService(s.id)}
                                    >
                                      <div className={styles.serviceDetails}>
                                        <span className={styles.serviceName}>{s.name}</span>
                                        <span className={styles.serviceDesc}>{s.desc}</span>
                                      </div>
                                      <div className={styles.serviceRight}>
                                        <span className={styles.servicePrice}>
                                          {typeof s.price === 'number' ? `Tk ${s.price.toLocaleString()}` : (s.priceLabel || 'Price on request')}
                                        </span>
                                        <div className={[styles.checkbox, checked && styles.checkboxChecked].filter(Boolean).join(' ')}>
                                          {checked && '✓'}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                {/* Remaining service groups rendered below (no separate 'Other Services' title) */}
                {SERVICE_GROUPS.filter(g => !['bathroom','kitchen','floor','fullhome','window','thaiglass'].includes(g.id)).map(group => (
                  <div key={group.id} className={styles.serviceGroup}>
                    <div className={styles.serviceGroupTitle}>
                      <span>{group.name}</span>
                      <button
                        className={styles.collapseBtn}
                        onClick={() => toggleGroup(group.id)}
                        aria-expanded={!!openGroups[group.id]}
                        aria-controls={`grp-${group.id}`}
                        type="button"
                      >
                        {openGroups[group.id] ? '▾' : '+'}
                      </button>
                    </div>
                    {openGroups[group.id] && (
                      <div id={`grp-${group.id}`} className={styles.nestedList}>
                        {group.items.map(s => {
                          const checked = selectedIds.includes(s.id);
                          return (
                            <div
                              key={s.id}
                              className={[styles.serviceItem, checked && styles.serviceSelected].filter(Boolean).join(' ')}
                              onClick={() => toggleService(s.id)}
                              role="checkbox"
                              aria-checked={checked}
                              tabIndex={0}
                              onKeyDown={e => e.key === 'Enter' && toggleService(s.id)}
                            >
                              <div className={styles.serviceDetails}>
                                <span className={styles.serviceName}>{s.name}</span>
                                <span className={styles.serviceDesc}>{s.desc}</span>
                              </div>
                              <div className={styles.serviceRight}>
                                <span className={styles.servicePrice}>
                                  {typeof s.price === 'number' ? `Tk ${s.price.toLocaleString()}` : (s.priceLabel || 'Price on request')}
                                </span>
                                <div className={[styles.checkbox, checked && styles.checkboxChecked].filter(Boolean).join(' ')}>
                                  {checked && '✓'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.totalBar}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>Tk {total.toLocaleString()}</span>
              </div>

              <button
                className={styles.nextBtn}
                disabled={selectedIds.length === 0}
                onClick={() => setStep(3)}
              >
                Next
              </button>
            </>
          )}

          {/* ── Step 3: Review & Contact ── */}
          {step === 3 && (
            <>
              <div className={styles.reviewTopRow}>
                <div className={styles.reviewLogo}>HT</div>
                <span className={styles.reviewBrand}>HT Service</span>
              </div>

              <div className={styles.reviewSection}>
                <h3 className={styles.reviewSectionTitle}>Date &amp; time</h3>
                <div className={styles.reviewRow}>
                  <span>{selTime}</span>
                  <span>{friendlyDate}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>

              <div className={styles.reviewSection}>
                <h3 className={styles.reviewSectionTitle}>Services</h3>
                {pickedServices.map(s => (
                  <div key={s.id} className={styles.reviewRow}>
                    <span>{s.name}</span>
                    <span className={styles.reviewPrice}>
                      {typeof s.price === 'number' ? `Tk ${s.price.toLocaleString()}` : (s.priceLabel || 'Price on request')}
                    </span>
                  </div>
                ))}
                <div className={[styles.reviewRow, styles.reviewTotal].join(' ')}>
                  <strong>Total</strong>
                  <strong className={styles.reviewPrice}>Tk {total.toLocaleString()}</strong>
                </div>
              </div>

              <div className={styles.reviewSection}>
                <h3 className={styles.reviewSectionTitle}>Your contact info</h3>
                <label className={styles.fieldLabel}>Full name <span className={styles.required}>*</span></label>
                <input
                  className={[styles.input, !form.name.trim() && styles.inputError].filter(Boolean).join(' ')}
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <label className={styles.fieldLabel}>Phone number <span className={styles.required}>*</span></label>
                <input
                  className={[styles.input, !form.phone.trim() && styles.inputError].filter(Boolean).join(' ')}
                  type="tel"
                  placeholder="e.g. 01700000000"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
                <label className={styles.fieldLabel}>Address <span className={styles.required}>*</span></label>
                <input
                  className={[styles.input, !form.address.trim() && styles.inputError].filter(Boolean).join(' ')}
                  type="text"
                  placeholder="House, Road, Area, Dhaka"
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                />
                <label className={styles.fieldLabel}>Appointment notes <span className={styles.optional}>(optional)</span></label>
                <textarea
                  className={[styles.input, styles.textarea].join(' ')}
                  placeholder="Any special requests or instructions"
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <p className={styles.footerNote}>
                Info you provide will be shared with HT Service so they can contact you.
              </p>

              <button className={styles.nextBtn} onClick={handleSubmit} disabled={!formValid}>
                Request appointment
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
