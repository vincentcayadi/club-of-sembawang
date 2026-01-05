'use client'

import React from 'react'
import { useHeaderStore } from '@/stores/useHeaderStore'
import { cn } from '@/lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  const hasHighImpactHero = useHeaderStore((state) => state.hasHighImpactHero)

  return (
    <div className={cn(!hasHighImpactHero && 'pt-[72px]', className)}>
      {children}
    </div>
  )
}
