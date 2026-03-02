'use client'

import { useState } from 'react'
import { tools, allTags, type Tool, type ToolTag } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import ToolModal from '@/components/ToolModal'

export default function Home() {
  const [activeTag, setActiveTag] = useState<ToolTag | 'All'>('All')
  const [activeTool, setActiveTool] = useState<Tool | null>(null)

  const filtered = activeTag === 'All' ? tools : tools.filter((t) => t.tag === activeTag)

  return (
    <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {(['All', ...allTags] as const).map((tag) => {
          const active = activeTag === tag
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                fontFamily: "'Saans Mono', monospace",
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '5px 12px',
                borderRadius: '5px',
                border: `1px solid ${active ? '#008c44' : '#d4e8da'}`,
                background: active ? '#008c44' : '#fff',
                color: active ? '#fff' : '#676c79',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* Tool grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} onClick={setActiveTool} />
        ))}
      </div>

      {/* Modal */}
      {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
      )}
    </main>
  )
}
