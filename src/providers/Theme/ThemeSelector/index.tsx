'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '..'

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button disabled>
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="hover:bg-neutral-100/10 duration-200 rounded-md flex justify-items-center items-center h-8 w-8"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 mx-auto" />
      ) : (
        <Moon className="h-5 w-5 mx-auto" />
      )}
    </button>
  )
}
