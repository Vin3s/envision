"use client";

import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const dots: any[] = [];
    const maxDots = 100;

    for (let i = 0; i < maxDots; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.5;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#8b5cf6';
        ctx.fill();

        // Draw connections
        for (let j = 0; j < dots.length; j++) {
          if (i === j) continue;
          const dot2 = dots[j];
          const dx = dot.x - dot2.x;
          const dy = dot.y - dot2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.stroke();
          }
        }

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off walls
        if (dot.x < 0 || dot.x > w) dot.vx *= -1;
        if (dot.y < 0 || dot.y > h) dot.vy *= -1;
      }

      requestAnimationFrame(draw);
    }

    function handleResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.2 }}
    />
  );
}