import React from 'react'
import type { HeroBlock } from '@/payload-types'
import { HighImpactHero } from './HighImpact'
import { MediumImpactHero } from './MediumImpact'
import { LowImpactHero } from './LowImpact'

export function HeroBlockComponent(props: HeroBlock) {
  const { type = 'mediumImpact' } = props

  switch (type) {
    case 'highImpact':
      return <HighImpactHero {...props} />
    case 'lowImpact':
      return <LowImpactHero {...props} />
    case 'mediumImpact':
    default:
      return <MediumImpactHero {...props} />
  }
}
