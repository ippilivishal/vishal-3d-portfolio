import { useEffect, useState } from 'react'

// The 3D character (public/models/me.glb) isn't committed yet. Check once whether it exists so the
// site can run without it: no character, same background, scroll, content and loading behaviour.
export const MODEL_URL = `${import.meta.env.BASE_URL}models/me.glb`

const check: Promise<boolean> = fetch(MODEL_URL, { method: 'HEAD' })
  .then((r) => r.ok && !(r.headers.get('content-type') || '').includes('text/html'))
  .catch(() => false)

let known: boolean | null = null
check.then((v) => (known = v))

export function useHasModel(): boolean | null {
  const [has, setHas] = useState<boolean | null>(known)
  useEffect(() => {
    let alive = true
    check.then((v) => alive && setHas(v))
    return () => {
      alive = false
    }
  }, [])
  return has
}
