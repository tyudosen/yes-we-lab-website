import { Block } from 'payload'

export const OrderStatusBlock: Block = {
  slug: 'orderStatusBlock',
  interfaceName: 'OrderStatusBlock',
  fields: [
    {
      name: 'test',
      relationTo: 'posts',
      type: 'relationship',
    },
  ],
  labels: {
    plural: 'Order Status Blocks',
    singular: 'Order Status Block',
  },
}
