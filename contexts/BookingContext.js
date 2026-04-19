import React, { createContext, useContext, useState } from 'react';
import { DETAILS } from '../data/details';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // selections: { [subId]: number[] }
  const [selections, setSelections] = useState({});

  function toggleSelection(subId, idx) {
    setSelections(prev => {
      const copy = { ...prev };
      const setFor = new Set(copy[subId] || []);
      if (setFor.has(idx)) setFor.delete(idx);
      else setFor.add(idx);
      if (setFor.size === 0) delete copy[subId];
      else copy[subId] = Array.from(setFor);
      return copy;
    });
  }

  function clearSelections() {
    setSelections({});
  }

  function getSelectedCount() {
    return Object.values(selections).reduce((sum, arr) => sum + (arr ? arr.length : 0), 0);
  }

  function getSelectedItems() {
    // return array of { subId, idx, label, price }
    return Object.entries(selections).flatMap(([subId, arr]) => {
      const idNum = Number(subId);
      const details = DETAILS[idNum] && DETAILS[idNum].items ? DETAILS[idNum].items : [];
      return (arr || []).map(i => ({ subId: idNum, idx: i, label: (details[i] && details[i].label) || '', price: (details[i] && details[i].price) || '' }));
    });
  }

  return (
    <BookingContext.Provider value={{ selections, toggleSelection, clearSelections, getSelectedCount, getSelectedItems }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
