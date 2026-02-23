'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, type SpringOptions } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface StarsBackgroundProps extends React.ComponentProps<'div'> {
  quantity?: number;
  speed?: number;
  starColor?: string;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export function StarsBackground({
  quantity = 100,
  speed = 0.5,
  starColor = '#CDFF00',
  minSize = 1,
  maxSize = 3,
  className = '',
  ...props
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig: SpringOptions = { stiffness: 50, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const initStars = useCallback((width: number, height: number) => {
    starsRef.current = Array.from({ length: quantity }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speed: Math.random() * speed + 0.1,
      opacity: Math.random() * 0.5 + 0.5,
    }));
  }, [quantity, speed, minSize, maxSize]);

  const drawStars = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const offsetX = (springX.get() - width / 2) * 0.02;
    const offsetY = (springY.get() - height / 2) * 0.02;

    starsRef.current.forEach((star) => {
      star.y += star.speed;
      
      if (star.y > height) {
        star.y = 0;
        star.x = Math.random() * width;
      }

      const x = star.x + offsetX * (star.size / maxSize);
      const y = star.y + offsetY * (star.size / maxSize);

      ctx.beginPath();
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = starColor;
      ctx.globalAlpha = star.opacity;
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = star.size * 2;
      ctx.shadowColor = starColor;
    });
    
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }, [springX, springY, starColor, maxSize]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawStars(ctx, canvas.width, canvas.height);
    animationRef.current = requestAnimationFrame(animate);
  }, [drawStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initStars(rect.width, rect.height);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initStars]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
