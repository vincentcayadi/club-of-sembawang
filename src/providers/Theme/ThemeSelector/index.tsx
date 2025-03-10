'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '..'

const DEFAULT_THEME = 'light'

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const storedTheme = localStorage.getItem('theme')
    if (!storedTheme) {
      setTheme(DEFAULT_THEME)
      localStorage.setItem('theme', DEFAULT_THEME)
    }
  }, [setTheme])

  return (
    <button
      onClick={() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
      }}
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-lg duration-200 hover:bg-neutral-100/10"
    >
      {theme === 'dark' ? (
        <Sun className="mx-auto h-5 w-5 text-white transition-colors duration-200" />
      ) : (
        <Moon className="mx-auto h-5 w-5 text-black transition-colors duration-200" />
      )}
    </button>
  )
}
