'use client'

import { useHeaderStore } from '@/stores/useHeaderStore'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const hasHighImpactHero = useHeaderStore((state) => state.hasHighImpactHero)

  return (
    <div className={cn(!hasHighImpactHero && 'pt-[72px]')}>
      {children}
    </div>
  )
}
