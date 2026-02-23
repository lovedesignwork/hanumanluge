'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface HexagonBackgroundProps extends React.ComponentProps<'div'> {
  hexagonSize?: number;
  hexagonMargin?: number;
  colors?: string[];
  glowIntensity?: number;
  className?: string;
}

export function HexagonBackground({
  hexagonSize = 60,
  hexagonMargin = 4,
  colors = ['#CDFF00', '#00E5FF', '#FF3366', '#8B5CF6', '#F97316'],
  glowIntensity = 0.4,
  className = '',
  ...props
}: HexagonBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hexagons, setHexagons] = useState<{ x: number; y: number; color: string; delay: number }[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const generateHexagons = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const hexWidth = hexagonSize * 2;
    const hexHeight = hexagonSize * Math.sqrt(3);
    const horizontalSpacing = hexWidth * 0.75 + hexagonMargin;
    const verticalSpacing = hexHeight + hexagonMargin;

    const cols = Math.ceil(width / horizontalSpacing) + 2;
    const rows = Math.ceil(height / verticalSpacing) + 2;

    const newHexagons: { x: number; y: number; color: string; delay: number }[] = [];

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * horizontalSpacing;
        const y = row * verticalSpacing + (col % 2 === 0 ? 0 : verticalSpacing / 2);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 2;

        newHexagons.push({ x, y, color, delay });
      }
    }

    setHexagons(newHexagons);
  }, [hexagonSize, hexagonMargin, colors]);

  useEffect(() => {
    generateHexagons();

    const handleResize = () => {
      generateHexagons();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateHexagons]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getDistanceFromMouse = (hexX: number, hexY: number) => {
    const dx = mousePos.x - hexX;
    const dy = mousePos.y - hexY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {hexagons.map((hex, index) => {
        const distance = getDistanceFromMouse(hex.x + hexagonSize, hex.y + hexagonSize * 0.866);
        const maxDistance = 200;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        const isNearMouse = distance < maxDistance;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: hex.x,
              top: hex.y,
              width: hexagonSize * 2,
              height: hexagonSize * Math.sqrt(3),
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isNearMouse ? 0.15 + intensity * glowIntensity : 0.08,
              scale: isNearMouse ? 1 + intensity * 0.1 : 1,
            }}
            transition={{
              duration: 0.3,
              delay: hex.delay * 0.1,
            }}
          >
            <svg
              viewBox="0 0 100 86.6"
              className="w-full h-full"
              style={{
                filter: isNearMouse ? `drop-shadow(0 0 ${10 + intensity * 20}px ${hex.color})` : 'none',
              }}
            >
              <defs>
                <linearGradient id={`hexGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={hex.color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={hex.color} stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                transform="translate(0, -6.7)"
                fill={`url(#hexGradient-${index})`}
                stroke={hex.color}
                strokeWidth={isNearMouse ? 1.5 : 0.5}
                strokeOpacity={isNearMouse ? 0.6 + intensity * 0.4 : 0.2}
              />
            </svg>
          </motion.div>
        );
      })}

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/30 to-navy/60 pointer-events-none" />
    </div>
  );
}
