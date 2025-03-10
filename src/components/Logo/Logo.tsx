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
      width={200}
      height={30}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('mr-auto h-auto w-auto max-w-48', className)}
      src="https://raw.githubusercontent.com/vincentcayadi/club-of-sembawang/main/public/logo.webp"
    />
  )
}
