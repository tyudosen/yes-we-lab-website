import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { getMeUser } from '@/utilities/getMeUser'

export const dynamic = "force-dynamic"

export async function Header() {
  // const headerData: Header = await getCachedGlobal('header', 1)()
  const { user } = await getMeUser()

  console.log('header obj', {
    // headerData,
    user
  })

  return <HeaderClient data={{ id: 1234 }} user={user} />
}
