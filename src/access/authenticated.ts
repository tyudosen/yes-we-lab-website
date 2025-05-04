import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import { checkRoles } from './checkRole'
import { editor } from './editor'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

export const isAdminOrEditor: isAuthenticated = ({ req: { user } }) => {
  return user ? checkRoles(['admin', 'editor'], user) : false
}
