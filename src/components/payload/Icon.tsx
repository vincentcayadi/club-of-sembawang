import React from 'react'
import icon from '@/assets/icon.webp'
import Image from 'next/image'

export default function Icon() {
  return (
    <div>
      <Image className="w-40" src={icon} alt="" />
    </div>
  )
}
