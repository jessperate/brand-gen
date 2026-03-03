'use client'

import { useEffect, useState } from 'react'

type Segment =
  | { type: 'text'; content: string }
  | { type: 'link'; text: string; url: string; raw: string }
  | { type: 'inlineCode'; content: string }

function parseInline(line: string): Segment[] {
  const segments: Segment[] = []
  const regex = /`([^`]+)`|\[([^\]]+)\]\(([^)]*)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: line.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'inlineCode', content: `\`${match[1]}\`` })
    } else {
      segments.push({ type: 'link', text: match[2], url: match[3], raw: match[0] })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < line.length) {
    segments.push({ type: 'text', content: line.slice(lastIndex) })
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: line }]
}

type ProcessedLine = {
  raw: string
  segments: Segment[]
  inCode: boolean
  isCodeFence: boolean
  isH1: boolean
  isH2: boolean
  isH3: boolean
  isSeparator: boolean
  isEmpty: boolean
}

function processContent(content: string): ProcessedLine[] {
  const lines = content.split('\n')
  const result: ProcessedLine[] = []
  let inCode = false

  for (const line of lines) {
    const isCodeFence = /^```/.test(line)
    if (isCodeFence) {
      result.push({
        raw: line,
        segments: [{ type: 'text', content: line }],
        inCode,
        isCodeFence: true,
        isH1: false,
        isH2: false,
        isH3: false,
        isSeparator: false,
        isEmpty: false,
      })
      inCode = !inCode
    } else {
      const isH3 = !inCode && /^### /.test(line)
      const isH2 = !inCode && !isH3 && /^## /.test(line)
      const isH1 = !inCode && !isH2 && !isH3 && /^# /.test(line)
      result.push({
        raw: line,
        segments: inCode ? [{ type: 'text', content: line }] : parseInline(line),
        inCode,
        isCodeFence: false,
        isH1,
        isH2,
        isH3,
        isSeparator: line === '---',
        isEmpty: line.trim() === '',
      })
    }
  }

  return result
}

function renderSegments(segments: Segment[]) {
  return segments.map((seg, i) => {
    if (seg.type === 'link') {
      return seg.url ? (
        <a
          key={i}
          href={seg.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#c8c8c8',
            textDecoration: 'none',
            background: '#1a1a1a',
            border: '1px solid #2e2e2e',
            padding: '0px 5px',
            display: 'inline',
          }}
        >
          {seg.raw}
        </a>
      ) : (
        <span key={i} style={{ background: '#1a1a1a', padding: '0px 5px' }}>
          {seg.raw}
        </span>
      )
    }
    if (seg.type === 'inlineCode') {
      return (
        <span
          key={i}
          style={{ color: '#a8d8a8', background: '#161616', padding: '0px 4px' }}
        >
          {seg.content}
        </span>
      )
    }
    return <span key={i}>{seg.content}</span>
  })
}

export default function MachineView() {
  const [content, setContent] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/brand-skill.md')
      .then((r) => r.text())
      .then(setContent)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  const lines = processContent(content)

  return (
    <div
      style={{
        background: '#0f0f0f',
        minHeight: '100vh',
        padding: '0 0 120px',
      }}
    >
      {/* Copy button */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleCopy}
          title="Copy raw markdown"
          style={{
            background: 'none',
            border: '1px solid #2a2a2a',
            cursor: 'pointer',
            padding: '6px 8px',
            color: copied ? '#00ff64' : '#555',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease, border-color 0.2s ease',
            borderColor: copied ? '#00ff64' : '#2a2a2a',
          }}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5" y="1" width="9" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M3 4H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          )}
        </button>
      </div>

      {/* Content column */}
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '64px 32px 0',
          fontFamily: "'Saans Mono', 'DM Mono', monospace",
          fontSize: '13px',
          lineHeight: '1.75',
          color: '#c0c0c0',
        }}
      >
        {lines.map((line, idx) => {
          if (line.isCodeFence) {
            return (
              <div key={idx} style={{ color: '#3a3a3a' }}>
                {line.raw}
              </div>
            )
          }

          if (line.inCode) {
            return (
              <div key={idx} style={{ color: '#8db88d' }}>
                {line.raw || '\u00a0'}
              </div>
            )
          }

          if (line.isSeparator) {
            return (
              <div
                key={idx}
                style={{
                  borderTop: '1px solid #1e1e1e',
                  margin: '24px 0',
                }}
              />
            )
          }

          if (line.isEmpty) {
            return <div key={idx} style={{ height: '0.5em' }} />
          }

          const isHeader = line.isH1 || line.isH2 || line.isH3

          return (
            <div
              key={idx}
              style={{
                color: line.isH1
                  ? '#ffffff'
                  : line.isH2
                  ? '#e0e0e0'
                  : line.isH3
                  ? '#d0d0d0'
                  : undefined,
                fontWeight: isHeader ? 600 : undefined,
                marginTop: line.isH1 ? '32px' : line.isH2 ? '24px' : line.isH3 ? '16px' : undefined,
              }}
            >
              {renderSegments(line.segments)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
