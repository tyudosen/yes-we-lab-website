import { Access } from 'payload'
import { checkRoles } from './checkRole'

export const admin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRoles(['admin'], user)) {
      return true
    }
  }

  return false
}
