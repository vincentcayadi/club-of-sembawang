'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react' // Import Lucide icons
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<'light' | 'dark' | 'auto'>('auto')

  const onThemeChange = (themeToSet: 'light' | 'dark' | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
    window.localStorage.setItem(themeLocalStorageKey, themeToSet)
  }

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey) as
      | 'light'
      | 'dark'
      | 'auto'
      | null
    setValue(preference ?? 'auto')
  }, [])

  return (
    <div className="flex gap-4 justify-end items-center">
      <button
        onClick={() => onThemeChange('light')}
        aria-label="Set light theme"
        className={` ${value === 'light' ? ' text-neutral-100' : 'text-neutral-400'} duration-300 ease-in-out transition`}
      >
        <Sun size={20} />
      </button>
      <button
        onClick={() => onThemeChange('dark')}
        aria-label="Set dark theme"
        className={` ${value === 'dark' ? ' text-neutral-100' : 'text-neutral-400'} duration-300 ease-in-out transition`}
      >
        <Moon size={20} />
      </button>
      <button
        onClick={() => onThemeChange('auto')}
        aria-label="Set auto theme"
        className={` ${value === 'auto' ? ' text-neutral-100' : 'text-neutral-400'} duration-300Z ease-in-out transition`}
      >
        <Monitor size={20} />
      </button>
    </div>
  )
}
