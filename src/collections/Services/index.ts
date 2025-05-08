import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'basePrice',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Film Development',
          value: 'development',
        },
        {
          label: 'Scanning',
          value: 'scanning',
        },
        {
          label: 'Prints',
          value: 'prints',
        },
      ],
      required: true,
    },
    {
      name: 'availableAddons', // This field links to the separate addons collection
      type: 'relationship',
      relationTo: 'addOns',
      hasMany: true, // A service can have multiple available add-ons
      label: 'Available Add-ons',
    },
  ],
}
