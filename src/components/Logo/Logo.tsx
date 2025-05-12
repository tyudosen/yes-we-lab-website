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
      alt="Payload Logo"
      width={250}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('min-w-[11.375rem] w-full h-[34px]', className)}
      src="https://raw.githubusercontent.com/tyudosen/static-assets/refs/heads/main/yes-we-lab-logo/svg/logo-no-background.svg"
    />
  )
}
