import { create } from 'zustand'

interface HeaderStore {
  hasHighImpactHero: boolean
  setHasHighImpactHero: (value: boolean) => void
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  hasHighImpactHero: false,
  setHasHighImpactHero: (value) => set({ hasHighImpactHero: value }),
}))
