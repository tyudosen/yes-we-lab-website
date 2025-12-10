import type { Block } from 'payload'
import { columnFields } from '@/fields/column'

export const ManifestoBlock: Block = {
  slug: 'manifestoBlock',
  labels: {
    singular: 'Manifesto',
    plural: 'Manifestos',
  },
  interfaceName: 'ManifestoBlock',
  fields: [
    {
      name: 'smallHeading',
      label: 'Small Heading',
      type: 'text',
    },
    {
      name: 'largeHeading',
      label: 'Large Heading',
      type: 'text',
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    }
  ],
}
