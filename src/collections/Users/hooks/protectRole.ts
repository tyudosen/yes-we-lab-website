import { FieldHook } from 'payload'

export const protectRole: FieldHook = ({ req: { user }, data }) => {
  const isAdmin = user?.roles?.includes('admin')

  if (!isAdmin) {
    return ['user']
  }

  const userRoles = new Set(data?.roles || [])
  userRoles.add('user')
  return [...userRoles.values()]
}
