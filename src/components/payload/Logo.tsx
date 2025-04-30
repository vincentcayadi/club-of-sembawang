import React from 'react'
import logo from '@/assets/logo.webp'
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Image className="h-40 object-contain md:h-60" src={logo} alt="" />
    </div>
  )
}
