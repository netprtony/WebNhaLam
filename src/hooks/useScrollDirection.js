import { useState, useEffect, useCallback } from 'react';

/**
 * Detects scroll direction (up/down).
 * Returns 'up' | 'down' | null
 */
export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState(null);
  const [prevScroll, setPrevScroll] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    const diff = currentScroll - prevScroll;

    if (Math.abs(diff) < threshold) return;

    setDirection(diff > 0 ? 'down' : 'up');
    setPrevScroll(currentScroll);
  }, [prevScroll, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return direction;
}
