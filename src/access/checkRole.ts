import { User } from '@/payload-types'

export const checkRoles = (requiredRoles: User['roles'] = [], user: User): boolean => {
  if (!user || !user.roles) return false

  return user.roles.some((role) => requiredRoles?.includes(role))
}
