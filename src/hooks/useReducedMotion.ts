import { useLayoutEffect, useRef } from 'react'
import { useUIStore } from '@/stores/uiStore'

/**
 * Custom hook to detect and respond to user's reduced motion preference
 * Returns a function to get the current preference (avoids state race condition)
 * Also syncs with Zustand store for global access
 */
export function useReducedMotion() {
  const prefersReducedRef = useRef(false)
  const setGlobalPrefersReducedMotion = useUIStore((state) => state.setPrefersReducedMotion)

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedRef.current = mediaQuery.matches
    setGlobalPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      prefersReducedRef.current = event.matches
      setGlobalPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [setGlobalPrefersReducedMotion])

  return () => prefersReducedRef.current
}
