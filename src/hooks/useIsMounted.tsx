import { useEffect, useState } from 'react'

/**
 * Tracks if component is mounted
 * Useful for preventing hydration mismatches
 */
export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
