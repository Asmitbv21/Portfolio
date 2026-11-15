'use client';

import { createContext, useCallback, useContext, useState } from 'react';

const FilterContext = createContext(null);

/**
 * Shared project filter so the "Creative roles" rows can filter the Work
 * section while the anchor still scrolls there.
 *
 * `popToken` increments on every filter change and is used to replay the
 * stagger-in animation on the visible cards.
 */
export function FilterProvider({ children }) {
  const [filter, setFilter] = useState('all');
  const [popToken, setPopToken] = useState(0);

  const applyFilter = useCallback((next) => {
    setFilter(next);
    setPopToken((token) => token + 1);
  }, []);

  return (
    <FilterContext.Provider value={{ filter, applyFilter, popToken }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useProjectFilter() {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useProjectFilter must be used inside FilterProvider');
  return context;
}
