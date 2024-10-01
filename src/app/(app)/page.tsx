import React from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Button } from '@/components/ui/button'

import HeaderServer from '@/app/blocks/global/Header/server'
import FooterServer from '@/app/blocks/global/Footer/server'

const Page = async () => {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'pages',
  })
  return (
    <>
      <HeaderServer />
      <div>
        <h1 className="text-4xl font-bold underline">Pages</h1>
        <Button variant="outline">Button</Button>
      </div>
      <FooterServer />
    </>
  )
}

export default Page
