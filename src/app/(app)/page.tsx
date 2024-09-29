import Link from 'next/link'
import React from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

const Page = async () => {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'pages',
  })
  return (
    <>
      <main>
        <h1 className="text-3xl font-bold underlin text-red-600">Hello world!</h1>
      </main>
    </>
  )
}

export default Page
