'use client'

import { useState, useEffect, useRef } from 'react'

// Text segments — boundaries let us apply styles mid-stream
const PREFIX   = 'Greenhouse OS is a collection of tools the brand team built from '
const UNDERLINE = 'the ground up'
const MIDDLE   = ' using Claude Code'
const SUFFIX   = ', giving every team at AirOps the power to create on-brand assets independently.'
const FULL     = PREFIX + UNDERLINE + MIDDLE + SUFFIX

const P_END = PREFIX.length
const U_END = P_END + UNDERLINE.length
const M_END = U_END + MIDDLE.length

const SPEED_MS = 22

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
        <rect x="2" y="2" width="32" height="32" rx="10" fill="#D97757"/>
        <ellipse cx="13" cy="15" rx="2.5" ry="3" fill="#fff"/>
        <ellipse cx="23" cy="15" rx="2.5" ry="3" fill="#fff"/>
        <circle cx="13" cy="15.5" r="1.2" fill="#5C2D0A"/>
        <circle cx="23" cy="15.5" r="1.2" fill="#5C2D0A"/>
        <path d="M12 23 Q18 28 24 23" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    </span>
  )
}

export default function HeroHeader({ animate }: { animate: boolean }) {
  const [revealed, setRevealed] = useState(0)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!animate) return
    intervalRef.current = setInterval(() => {
      setRevealed((r) => {
        if (r >= FULL.length) {
          clearInterval(intervalRef.current!)
          return r
        }
        return r + 1
      })
    }, SPEED_MS)
    return () => clearInterval(intervalRef.current!)
  }, [animate])

  const typing = revealed < FULL.length

  const showPrefix    = FULL.slice(0, Math.min(revealed, P_END))
  const showUnderline = revealed > P_END ? FULL.slice(P_END, Math.min(revealed, U_END)) : ''
  const showMiddle    = revealed > U_END ? FULL.slice(U_END, Math.min(revealed, M_END)) : ''
  const showIcon      = revealed >= M_END
  const showSuffix    = revealed > M_END ? FULL.slice(M_END, revealed) : ''

  return (
    <>
      <style>{`
        @keyframes claudeDance {
          0%   { transform: translateY(0)    rotate(0deg)  scale(1); }
          20%  { transform: translateY(-6px) rotate(-8deg) scale(1.05); }
          40%  { transform: translateY(0)    rotate(0deg)  scale(1); }
          60%  { transform: translateY(-5px) rotate(8deg)  scale(1.05); }
          80%  { transform: translateY(0)    rotate(0deg)  scale(1); }
          100% { transform: translateY(0)    rotate(0deg)  scale(1); }
        }
        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
      `}</style>

      <div style={{ background: '#002910', padding: '52px 40px', width: '100%' }}>
        <p
          style={{
            margin: 0,
            color: '#fff',
            fontFamily: "'Serrif VF', serif",
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 64px)',
            lineHeight: 1.18,
            maxWidth: '900px',
            opacity: animate ? 1 : 0,
          }}
        >
          {showPrefix}

          {showUnderline && (
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
              {showUnderline}
            </span>
          )}

          {showMiddle}
          {showIcon && <ClaudeIcon />}
          {showSuffix}

          {typing && animate && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '0.85em',
                background: '#a8f0c6',
                marginLeft: '3px',
                verticalAlign: 'middle',
                animation: 'caretBlink 0.7s step-end infinite',
              }}
            />
          )}
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
