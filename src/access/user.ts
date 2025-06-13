import { Access } from 'payload'
import { checkRoles } from './checkRole'

export const user: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRoles(['admin', 'editor'], user)) {
      return true
    }

    return { id: { equals: user?.id } }
  }

  return false
}

export const userMediaCollection: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRoles(['admin', 'editor'], user)) {
      return true
    }

    return { 'ownedBy.id': { equals: user?.id } }
  }

  return false
}
