import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="ICS Logo"
      width={150}
      height={30}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('mx-auto h-auto w-auto max-w-[150px]', className)}
      src="https://raw.githubusercontent.com/vincentcayadi/club-of-sembawang/main/public/logo.webp"
    />
  )
}
