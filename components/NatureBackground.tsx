'use client';

import React, { useEffect, useState, memo } from 'react';

const SkipjackTuna = ({
  waveClass,
  dimensions,
  gradientId,
  stops,
  colors,
  stripeOpacity,
  animations
}: {
  waveClass: string;
  dimensions: string;
  gradientId: string;
  stops: [string, string, string, string];
  colors: { finlets: string; dorsal1: string; dorsal2: string; anal: string; stripes: string; pectoral: string; gill: string };
  stripeOpacity: string;
  animations: { tail: string; dorsal: string; anal: string; pectoral: string };
}) => (
  <svg className={`${waveClass} ${dimensions} overflow-visible`} viewBox="0 0 150 50">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stops[0]} />
        <stop offset="40%" stopColor={stops[1]} />
        <stop offset="55%" stopColor={stops[2]} />
        <stop offset="100%" stopColor={stops[3]} />
      </linearGradient>
    </defs>
    {/* Finlets */}
    <path d="M 40 16 L 37 11 L 34 17 L 31 12 L 28 18 L 25 13 L 22 19 L 19 14 L 16 20" fill="none" stroke={colors.finlets} strokeWidth="1.5"/>
    <path d="M 40 34 L 37 39 L 34 35 L 31 40 L 28 36 L 25 41 L 22 37 L 19 42 L 16 38" fill="none" stroke={colors.finlets} strokeWidth="1.5"/>
    {/* Tail */}
    <path d="M 15 25 Q 10 5 -5 -5 Q 5 15 12 25 Q 5 35 -5 55 Q 10 45 15 25 Z" className="tail-wag" style={{ animationDuration: animations.tail, transformOrigin: '15px 25px' }} fill={`url(#${gradientId})`}/>
    {/* Dorsal Fins */}
    <path d="M 95 8 Q 85 -2 75 6 Z" fill={colors.dorsal1}/>
    <path d="M 55 13 Q 50 -10 35 5 Q 45 10 50 15 Z" className="dorsal-flap" style={{ animationDuration: animations.dorsal, transformOrigin: '55px 13px' }} fill={colors.dorsal2}/>
    {/* Anal Fin */}
    <path d="M 55 37 Q 50 60 35 45 Q 45 40 50 35 Z" className="anal-flap" style={{ animationDuration: animations.anal, transformOrigin: '55px 37px' }} fill={colors.anal}/>
    {/* Main Body */}
    <path d="M 145 25 C 130 8, 90 0, 70 6 C 50 12, 25 21, 15 24 L 15 26 C 25 29, 50 42, 70 46 C 90 50, 130 40, 145 25 Z" fill={`url(#${gradientId})`}/>
    {/* Stripes */}
    <path d="M 105 32 Q 70 38 35 30" fill="none" stroke={colors.stripes} strokeWidth="1.2" strokeLinecap="round" opacity={stripeOpacity}/>
    <path d="M 100 36 Q 70 42 35 33" fill="none" stroke={colors.stripes} strokeWidth="1.2" strokeLinecap="round" opacity={stripeOpacity}/>
    <path d="M 95 40 Q 70 46 40 36" fill="none" stroke={colors.stripes} strokeWidth="1.2" strokeLinecap="round" opacity={stripeOpacity}/>
    <path d="M 90 44 Q 70 50 45 39" fill="none" stroke={colors.stripes} strokeWidth="1.2" strokeLinecap="round" opacity={stripeOpacity}/>
    {/* Pectoral Fin */}
    <path d="M 105 28 Q 85 36 75 30 Q 90 26 105 28 Z" className="pectoral-flap" style={{ animationDuration: animations.pectoral, transformOrigin: '105px 28px' }} fill={colors.pectoral} opacity="0.9"/>
    {/* Eye and Gill */}
    <circle cx="132" cy="22" r="2.5" fill="#020617"/>
    <circle cx="132.5" cy="21.5" r="0.5" fill="#ffffff"/>
    <path d="M 118 16 C 112 20, 112 30, 118 36" fill="none" stroke={colors.gill} strokeWidth="1.5" opacity="0.6"/>
  </svg>
);

const NatureBackground = memo(function NatureBackground() {
  const [particles, setParticles] = useState<{id: number, size: number, top: number, duration: number, delay: number}[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sinh các hạt gió (giảm số lượng từ 35 xuống 15 để tối ưu hiệu suất)
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -30,
    }));
    setParticles(newParticles);

    // Trì hoãn render các SVG nặng thêm 300ms để luồng chính rảnh tay render sách (tránh giật lag lúc mở trang)
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none animate-fade-in">
      
      {/* Nắng (Sun & Sunrays) */}
      <div className="absolute -top-20 -right-20 w-96 h-96 pointer-events-none z-10">
        <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(254,240,138,0.4) 0%, rgba(254,240,138,0) 70%)' }}></div>
        <svg className="w-full h-full text-yellow-300 opacity-50 sun-spin" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="15" fill="currentColor" />
          {[...Array(8)].map((_, i) => (
             <path key={i} d="M 48 10 L 52 10 L 50 25 Z" fill="currentColor" transform={`rotate(${i * 45} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* Hiệu ứng Gió (Các luồng khí / hạt lấp lánh bay) */}
      <div className="absolute inset-0 z-20">
        {particles.map(p => (
          <div 
            key={p.id}
            className="absolute rounded-full bg-[#e0f2fe] wind-particle opacity-0"
            style={{
              width: p.size + 'px',
              height: p.size + 'px',
              top: p.top + '%',
              left: '-5%',
              animationDuration: p.duration + 's',
              animationDelay: p.delay + 's',
            }}
          ></div>
        ))}
      </div>


      {/* Hiệu ứng Cá Ngừ bơi (Tuna) dưới Biển */}
      <div className="absolute inset-0 z-20">
        
        {/* Tuna 1 (Skipjack) */}
        <div className="tuna tuna-1">
          <SkipjackTuna 
            waveClass="fish-wave-1" dimensions="w-64 h-24" gradientId="skip1"
            stops={["#0f172a", "#1e40af", "#cbd5e1", "#f8fafc"]}
            colors={{ finlets: "#1e293b", dorsal1: "#0f172a", dorsal2: "#1e293b", anal: "#1e293b", stripes: "#0f172a", pectoral: "#94a3b8", gill: "#475569" }}
            stripeOpacity="0.8" animations={{ tail: '0.4s', dorsal: '0.6s', anal: '0.6s', pectoral: '0.5s' }}
          />
        </div>

        {/* Tuna 2 (Skipjack) */}
        <div className="tuna tuna-2">
          <SkipjackTuna 
            waveClass="fish-wave-2" dimensions="w-48 h-16" gradientId="skip2"
            stops={["#1e3a8a", "#2563eb", "#e2e8f0", "#ffffff"]}
            colors={{ finlets: "#1e3a8a", dorsal1: "#1e3a8a", dorsal2: "#1e40af", anal: "#1e40af", stripes: "#0f172a", pectoral: "#93c5fd", gill: "#64748b" }}
            stripeOpacity="0.6" animations={{ tail: '0.45s', dorsal: '0.7s', anal: '0.7s', pectoral: '0.55s' }}
          />
        </div>

        {/* Tuna 3 (Skipjack) */}
        <div className="tuna tuna-3">
          <SkipjackTuna 
            waveClass="fish-wave-3" dimensions="w-80 h-32" gradientId="skip3"
            stops={["#020617", "#0f172a", "#94a3b8", "#f1f5f9"]}
            colors={{ finlets: "#020617", dorsal1: "#020617", dorsal2: "#0f172a", anal: "#0f172a", stripes: "#020617", pectoral: "#64748b", gill: "#475569" }}
            stripeOpacity="0.9" animations={{ tail: '0.5s', dorsal: '0.8s', anal: '0.8s', pectoral: '0.6s' }}
          />
        </div>
        
      </div>

      {/* Hiệu ứng Biển/Hồ (Sóng nước) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none opacity-[0.6] z-30">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 20 150 50" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="#bae6fd" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="#7dd3fc" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="#38bdf8" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#0ea5e9" />
          </g>
        </svg>
      </div>
      
    </div>
  );
});

export default NatureBackground;
