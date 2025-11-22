import { useEffect, useRef } from 'react'

/**
 * Detects clicks outside of a referenced element
 * Useful for closing dropdowns, modals, etc.
 */
export const useClickAway = <T extends HTMLElement = HTMLElement>(
  callback: () => void,
): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [callback])

  return ref
}
