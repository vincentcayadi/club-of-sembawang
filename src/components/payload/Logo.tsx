import React from 'react'
import logo from '@/assets/logo.webp'
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Image className="h-20 object-contain dark:invert" src={logo} alt="" />
    </div>
  )
}
