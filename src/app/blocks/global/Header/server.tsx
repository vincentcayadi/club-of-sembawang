import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'

export default async function HeaderServer() {
  const payload = await getPayloadHMR({ config })
  const header = await payload.findGlobal({ slug: 'header' })
  return (
    <div className="bg-gray-500 ">
      <div className=" py-12 max-w-5xl mx-auto flex justify-between w-full items-center">
        <div className="relative w-64 h-20 ">
          {/* <Image src={header.logo.url} fill className="object-contain" /> */}
          <div>
            {header.nav.map((nav, index) => (
              <Link key={index} href={nav.link} className="text-white text-sm font-bold">
                {nav.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
