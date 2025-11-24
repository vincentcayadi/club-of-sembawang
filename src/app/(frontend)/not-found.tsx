'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-9xl font-bold text-muted-foreground/20">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
          >
            <Home className="h-4 w-4" />
            <span>Go to homepage</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
