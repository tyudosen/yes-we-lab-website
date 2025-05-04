import { Access } from 'payload'
import { checkRoles } from './checkRole'

export const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRoles(['admin', 'editor'], user)) {
      return true
    }
  }

  return false
}
