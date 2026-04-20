import { useState, useEffect } from 'react';
import styles from '../styles/BookingModal.module.css';
import { useBooking } from '../contexts/BookingContext';
import { DETAILS } from '../data/details';

const SERVICES = [
  { id: 1, name: 'Cleaning service', desc: 'General cleaning services for homes and offices', price: 2000 },
  { id: 2, name: 'Pest control service', desc: 'Mosquito and pest control treatments', price: 1800 },
  { id: 3, name: 'Shifting Service', desc: 'Packing, loading and shifting assistance', price: 3500 },
  { id: 4, name: 'AC Service', desc: 'AC maintenance and servicing', price: 2500 },
  { id: 5, name: 'Construction Service', desc: 'Post-construction cleaning and debris removal', price: 4000 },
];

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

export default function BookingModal({ onClose, onBook, initialSelected = null, preselectedItems = null, skipServices = false, startStep = null }) {
  const bookingCtx = useBooking();
  // if parent didn't pass preselectedItems, read from context
  const contextItems = bookingCtx ? bookingCtx.getSelectedItems() : [];
  const effectivePreselected = (preselectedItems && preselectedItems.length) ? preselectedItems : contextItems;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);
  const initialStep = startStep || (initialSelected ? 2 : (effectivePreselected && effectivePreselected.length ? 2 : 1));
  const [step, setStep] = useState(initialStep);
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selDate, setSelDate] = useState({ year: now.getFullYear(), month: now.getMonth(), day: now.getDate() });
  const [selTime, setSelTime] = useState(null);
  const [selectedIds, setSelectedIds] = useState(initialSelected ? [initialSelected] : []);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });

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
  // If the parent passed `preselectedItems`, treat them as the picked services for review
  const parsePriceNum = (p) => {
    if (!p && p !== 0) return 0;
    if (typeof p === 'number') return p;
    const digits = String(p).replace(/[^0-9]/g, '');
    return digits ? parseInt(digits, 10) : 0;
  };

  // combine top-level selected services and selected detail items
  const sourceItems = (effectivePreselected && effectivePreselected.length) ? effectivePreselected : contextItems;
  // Top-level services should not contribute price; only sub-item prices count
  const servicesFromIds = SERVICES.filter(s => selectedIds.includes(s.id)).map(s => ({ id: s.id, name: s.name, price: 0 }));
  const itemsFromSource = (sourceItems || []).map((it, idx) => ({ id: it.subId ? `${it.subId}_${it.idx}` : `pre_${idx}`, name: it.label, price: parsePriceNum(it.price) }));

  const pickedServices = [...servicesFromIds, ...itemsFromSource];
  const total = pickedServices.reduce((sum, s) => sum + (s.price || 0), 0);

  const [openServices, setOpenServices] = useState([]);

  function toggleServiceDetails(id) {
    setOpenServices(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

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

  // which cleaning sub-groups are open (e.g. '101', '102')
  const [openGroups, setOpenGroups] = useState([]);
  function toggleGroup(id) {
    setOpenGroups(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
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
                onClick={() => setStep(skipServices ? 3 : 2)}
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
                {SERVICES.map(s => {
                  const checked = selectedIds.includes(s.id);
                  return (
                    <div key={s.id}>
                      <div
                        className={[styles.serviceItem, checked && styles.serviceSelected].filter(Boolean).join(' ')}
                        onClick={() => toggleService(s.id)}
                        role="button"
                        aria-pressed={checked}
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && toggleService(s.id)}
                      >
                        <div className={styles.serviceDetails}>
                          <span className={styles.serviceName}>{s.name}</span>
                          <span className={styles.serviceDesc}>{s.desc}</span>
                        </div>
                        <div className={styles.serviceRight}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              type="button"
                              aria-label={`Toggle ${s.name} details`}
                              aria-expanded={openServices.includes(s.id)}
                              className={styles.serviceChevron}
                              onClick={(e) => { e.stopPropagation(); toggleServiceDetails(s.id); if (!selectedIds.includes(s.id)) toggleService(s.id); }}
                            >
                              {openServices.includes(s.id) ? '▴' : '▾'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {openServices.includes(s.id) && (
                        <div style={{ marginTop: 10, paddingLeft: 8 }}>
                          {s.id === 1 ? (
                            Object.entries(DETAILS).map(([subId, group]) => (
                              <div key={subId} style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                  <div style={{ fontWeight: 800, color: '#e6fbff' }}>{group.title || `Service ${subId}`}</div>
                                  <button
                                    type="button"
                                    aria-expanded={openGroups.includes(subId)}
                                    aria-controls={`group-${subId}`}
                                    className={[styles.groupChevron, openGroups.includes(subId) ? styles.groupChevronOpen : ''].filter(Boolean).join(' ')}
                                    onClick={(e) => { e.stopPropagation(); toggleGroup(subId); }}
                                  >
                                    {openGroups.includes(subId) ? '▴' : '▾'}
                                  </button>
                                </div>
                                {openGroups.includes(subId) && (
                                  <div id={`group-${subId}`} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {group.items.map((it, idx) => {
                                      const checkedDetail = bookingCtx && bookingCtx.selections && bookingCtx.selections[subId] && bookingCtx.selections[subId].includes(idx);
                                      return (
                                        <div key={idx} className={[styles.serviceItem, checkedDetail && styles.serviceSelected].filter(Boolean).join(' ')} style={{ background: '#071324' }} onClick={() => bookingCtx.toggleSelection(Number(subId), idx)} role="checkbox" aria-checked={!!checkedDetail} tabIndex={0} onKeyDown={e => e.key === 'Enter' && bookingCtx.toggleSelection(Number(subId), idx)}>
                                          <div className={styles.serviceDetails}>
                                            <span className={styles.serviceName} style={{ color: it.price ? '#fff' : '#cfeafd', fontWeight: it.price ? 700 : 600 }}>{it.label}</span>
                                          </div>
                                          <div className={styles.serviceRight}>
                                            {it.price && <span className={styles.servicePrice}>{it.price}</span>}
                                            <div className={[styles.checkbox, checkedDetail && styles.checkboxChecked].filter(Boolean).join(' ')}>
                                              {checkedDetail && '✓'}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <div style={{ padding: 10, background: '#071324', borderRadius: 8 }}>
                              <div style={{ color: '#cfeafd', marginBottom: 6 }}>{s.desc}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                    <span className={styles.reviewPrice}>Tk {s.price.toLocaleString()}</span>
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
