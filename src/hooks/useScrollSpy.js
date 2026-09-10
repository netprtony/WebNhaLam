import { useState, useEffect, useRef } from 'react';

/**
 * Scroll-spy hook that detects which section is currently in viewport.
 * @param {string[]} sectionIds - Array of section element IDs to observe
 * @param {number} offset - Offset from top in pixels (default 100)
 * @returns {string} - Currently active section ID
 */
export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, offset]);

  return activeId;
}
