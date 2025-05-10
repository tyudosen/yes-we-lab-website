import { Block } from 'payload';

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlock',
  fields: [
    {
      name: 'title',
      type: 'text'
    }
  ]
}
