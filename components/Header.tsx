export default function Header() {
  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '1px solid #d4e8da',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* AirOps wordmark */}
      <svg
        width="90"
        height="20"
        viewBox="0 0 90 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AirOps"
      >
        <text
          x="0"
          y="16"
          fontFamily="'Saans', sans-serif"
          fontWeight="700"
          fontSize="18"
          fill="#001408"
          letterSpacing="-0.5"
        >
          AirOps
        </text>
      </svg>

      {/* Right side: Brand Gen + separator + tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            fontFamily: "'Saans Mono', monospace",
            fontWeight: 500,
            fontSize: '13px',
            color: '#001408',
            letterSpacing: '0.02em',
          }}
        >
          Brand Gen
        </span>
        <span style={{ width: '1px', height: '16px', background: '#d4e8da', display: 'block' }} />
        <span
          style={{
            fontFamily: "'Saans', sans-serif",
            fontSize: '12px',
            color: '#676c79',
          }}
        >
          Internal brand tools
        </span>
      </div>
    </header>
  )
}
