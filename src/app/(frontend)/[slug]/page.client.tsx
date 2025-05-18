'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { OrderModal } from '@/modals/OrderModal'
import { Effect } from 'effect'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()
  const [isOpen, setIsOpen] = useState(true)

  const setIsOpenEffect = useMemo(() => Effect.sync(() => setIsOpen(() => false)), [setIsOpen])
  const setIsOpenRun = useCallback(() => Effect.runSync(setIsOpenEffect), [setIsOpenEffect])



  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])
  return <OrderModal isOpen={isOpen} onClose={setIsOpenRun} />
}

export default PageClient
