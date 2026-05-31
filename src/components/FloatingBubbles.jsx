import React, { useMemo } from 'react';

/**
 * Floating bubble particles — purely CSS-animated, zero JS overhead after mount.
 * @param {number} count   - number of bubbles (default 18)
 * @param {string} className - extra container classes
 */
const FloatingBubbles = ({ count = 18, className = '' }) => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size:     Math.round(Math.random() * 58 + 16),          // 16–74 px
        left:     +(Math.random() * 96).toFixed(1),             // 0–96 %
        delay:    +(Math.random() * 12).toFixed(2),             // 0–12 s
        duration: +(Math.random() * 9 + 12).toFixed(2),        // 12–21 s
      })),
    [count],
  );

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width:             b.size,
            height:            b.size,
            left:              `${b.left}%`,
            animationDelay:    `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
