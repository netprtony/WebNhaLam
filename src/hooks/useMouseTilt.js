import { useState, useCallback, useRef } from 'react';

/**
 * Hook for mouse-reactive tilt effect on an element.
 * Tracks mouse position relative to element center and returns
 * rotateX/rotateY values (max ±maxDeg degrees).
 *
 * Usage:
 * const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useMouseTilt(8);
 */
export function useMouseTilt(maxDeg = 8) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to -1..1
      const normalX = (e.clientX - centerX) / (rect.width / 2);
      const normalY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp to -1..1
      const clampedX = Math.max(-1, Math.min(1, normalX));
      const clampedY = Math.max(-1, Math.min(1, normalY));

      // rotateY follows X-axis movement, rotateX follows Y-axis (inverted)
      setRotateY(clampedX * maxDeg);
      setRotateX(-clampedY * maxDeg);
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
