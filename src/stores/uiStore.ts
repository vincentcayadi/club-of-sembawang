'use client'

import { create } from 'zustand'

type UIState = {
  prefersReducedMotion: boolean
  setPrefersReducedMotion: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  prefersReducedMotion: false,
  setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
}))
