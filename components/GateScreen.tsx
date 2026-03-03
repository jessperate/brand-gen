'use client'

import { useState } from 'react'

type Props = {
  onHuman: () => void
  onMachine: () => void
}

export default function GateScreen({ onHuman, onMachine }: Props) {
  const [hoveredHuman, setHoveredHuman] = useState(false)
  const [hoveredMachine, setHoveredMachine] = useState(false)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#002910',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
    >
      {/* Prompt */}
      <p
        style={{
          fontFamily: "'Saans Mono', 'DM Mono', monospace",
          fontSize: '12px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.35)',
          margin: '0 0 32px',
        }}
      >
        identify visitor type
      </p>

      {/* Choices */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {/* Human */}
        <button
          onClick={onHuman}
          onMouseEnter={() => setHoveredHuman(true)}
          onMouseLeave={() => setHoveredHuman(false)}
          style={{
            width: '160px',
            padding: '20px 0',
            background: hoveredHuman ? '#00ff64' : '#ffffff',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Saans Mono', 'DM Mono', monospace",
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#002910',
            transition: 'background 0.15s ease',
          }}
        >
          Human
        </button>

        {/* Machine */}
        <button
          onClick={onMachine}
          onMouseEnter={() => setHoveredMachine(true)}
          onMouseLeave={() => setHoveredMachine(false)}
          style={{
            width: '160px',
            padding: '20px 0',
            background: hoveredMachine ? 'rgba(0,255,100,0.08)' : 'transparent',
            border: '1px solid #00ff64',
            cursor: 'pointer',
            fontFamily: "'Saans Mono', 'DM Mono', monospace",
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#00ff64',
            transition: 'background 0.15s ease',
          }}
        >
          Machine
        </button>
      </div>
    </div>
  )
}
