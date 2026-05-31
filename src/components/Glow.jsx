import React from 'react';

const Glow = ({ color = "rgba(106, 13, 173, 0.2)", size = "500px", className = "" }) => {
  return (
    <div
      className={`absolute rounded-full soft-glow ${className}`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        width: size,
        height: size,
      }}
    />
  );
};

export default Glow;
