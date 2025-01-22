import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center w-3/4 mx-auto space-y-4 text-center">
      <h1 className="text-9xl font-bold font-mono">404</h1>
      <h2 className="text-3xl font-semibold capitalize">This page is not found</h2>
      <p className="text-lg">
        The page you are looking for might have been removed, had its name changed or is temporarily
        unavailable.
      </p>

      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
