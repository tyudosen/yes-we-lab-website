import { Block } from "payload";

export const RecentScans: Block = {
  slug: 'recentScansBlock',
  interfaceName: 'RecentScans',
  fields: [
    {
      name: 'title',
      type: 'text'
    }
  ]
}
