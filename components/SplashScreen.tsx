'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Lottie, { type LottieRefCurrentProps } from 'lottie-react'

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [visible, setVisible] = useState(true)
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const advancedRef = useRef(false)

  useEffect(() => {
    fetch('/loading-animation.json')
      .then((r) => r.json())
      .then(setAnimationData)
  }, [])

  const advance = useCallback(() => {
    if (advancedRef.current) return
    advancedRef.current = true
    setVisible(false)
    onDone()
  }, [onDone])

  // Once animationData loads, set a fallback timeout based on the animation duration
  useEffect(() => {
    if (!animationData) return
    let fallback: ReturnType<typeof setTimeout>
    // Give lottie one tick to mount, then read actual duration
    const t = setTimeout(() => {
      const duration = lottieRef.current?.getDuration?.(false) ?? 4
      fallback = setTimeout(advance, (duration + 0.3) * 1000)
    }, 100)
    return () => { clearTimeout(t); clearTimeout(fallback) }
  }, [animationData, advance])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#F8FFFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {animationData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={true}
          onComplete={advance}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  )
}
