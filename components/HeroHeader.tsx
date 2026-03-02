'use client'

import { useState } from 'react'

function ClaudeIcon() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle',
        marginLeft: '6px',
        position: 'relative',
        top: '-2px',
        animation: 'claudeDance 1.4s ease-in-out infinite',
      }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <rect x="2" y="2" width="32" height="32" rx="10" fill="#D97757"/>
        {/* Left eye */}
        <ellipse cx="13" cy="15" rx="2.5" ry="3" fill="#fff"/>
        {/* Right eye */}
        <ellipse cx="23" cy="15" rx="2.5" ry="3" fill="#fff"/>
        {/* Left pupil */}
        <circle cx="13" cy="15.5" r="1.2" fill="#5C2D0A"/>
        {/* Right pupil */}
        <circle cx="23" cy="15.5" r="1.2" fill="#5C2D0A"/>
        {/* Smile */}
        <path d="M12 23 Q18 28 24 23" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Left arm raised */}
        <path d="M2 14 Q-3 8 1 4" stroke="#D97757" strokeWidth="3" strokeLinecap="round" fill="none"/>
        {/* Right arm raised */}
        <path d="M34 14 Q39 8 35 4" stroke="#D97757" strokeWidth="3" strokeLinecap="round" fill="none"/>
      </svg>
    </span>
  )
}

export default function HeroHeader({ animate }: { animate: boolean }) {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)

  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes claudeDance {
          0%   { transform: translateY(0)    rotate(0deg)   scale(1); }
          20%  { transform: translateY(-6px) rotate(-8deg)  scale(1.05); }
          40%  { transform: translateY(0)    rotate(0deg)   scale(1); }
          60%  { transform: translateY(-5px) rotate(8deg)   scale(1.05); }
          80%  { transform: translateY(0)    rotate(0deg)   scale(1); }
          100% { transform: translateY(0)    rotate(0deg)   scale(1); }
        }
      `}</style>

      <div
        style={{
          background: '#002910',
          padding: '52px 40px',
          width: '100%',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#fff',
            fontFamily: "'Serrif VF', serif",
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 64px)',
            lineHeight: 1.35,
            maxWidth: '900px',
            opacity: animate ? undefined : 0,
            animation: animate ? 'heroFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none',
          }}
        >
          Greenhouse OS is a collection of tools the brand team built from{' '}
          <span
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setCursor(null)}
            style={{
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              cursor: cursor ? 'none' : 'default',
              whiteSpace: 'nowrap',
            }}
          >
            the ground up
          </span>
          {' '}using Claude Code<ClaudeIcon />, giving every team at AirOps the power to create on-brand assets independently.
        </p>
      </div>

      {cursor && (
        <span
          style={{
            position: 'fixed',
            left: cursor.x,
            top: cursor.y,
            fontSize: '26px',
            lineHeight: 1,
            pointerEvents: 'none',
            transform: 'translate(-4px, -20px)',
            zIndex: 9999,
            userSelect: 'none',
          }}
        >
          🌱
        </span>
      )}
    </>
  )
}
