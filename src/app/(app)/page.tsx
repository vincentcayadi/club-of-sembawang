import React from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Button } from '@/components/ui/button'

const Page = async () => {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'pages',
  })
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold underline">Pages</h1>
        <Button variant="outline">Button</Button>
      </div>
    </>
  )
}

export default Page
