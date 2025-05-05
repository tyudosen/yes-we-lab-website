import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '../../access/authenticated'
import { protectRole } from './hooks/protectRole'
import { user } from '@/access/user'
import { admin } from '@/access/admin'
import { anyone } from '@/access/anyone'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: anyone,
    read: user,
    update: user,
    delete: admin,
    admin: isAdminOrEditor,
    unlock: admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      hasMany: true,
      type: 'select',
      hooks: {
        beforeChange: [protectRole],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
    },
  ],
  timestamps: true,
}
