import { useEffect, useRef } from 'react'

// ~33M pricing events a day on the last platform Vishal worked on → events per millisecond
const PER_MS = 33_000_000 / 86_400_000

export default function EventCounter() {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const start = performance.now()
    const fmt = new Intl.NumberFormat('en-US')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let timer = 0
    const paint = () => {
      if (numRef.current) numRef.current.textContent = fmt.format(Math.floor((performance.now() - start) * PER_MS))
    }
    if (reduced) {
      paint()
      timer = window.setInterval(paint, 1000)
    } else {
      const loop = () => {
        paint()
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="event-counter">
      <span className="ec-num" ref={numRef}>
        0
      </span>
      <span className="ec-label">pricing events since you arrived</span>
      <span className="ec-sub">at the ~33M-a-day rate I worked with</span>
    </div>
  )
}
