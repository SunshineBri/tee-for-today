import React, { useRef } from 'react';
import { useInView } from '../hooks/useInView'; 

export default function Decorations({
  imageClass = '',
  top = '',
  left = '',
  right = '',
  width = 'w-32',
  height = 'h-32',
  threshold = 0.1,
  transitionDuration = 700,
}) {
  const ref = useRef(null);
  const isVisible = useInView(ref, { threshold });

  const positionClasses = `${top} ${left} ${right}`;

  return (
    <div
      ref={ref}
      className={`
        absolute
        ${positionClasses}
        ${width} ${height}
        bg-contain bg-no-repeat
        ${imageClass}
        transition ease-out
        pointer-events-none
        z-10
        ${isVisible ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}
      `}
      style={{ transitionDuration: `${transitionDuration}ms` }}
    />
  );
}
