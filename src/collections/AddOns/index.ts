import { CollectionConfig } from 'payload'

export const AddOns: CollectionConfig = {
  slug: 'addOns',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Add-on Name',
    },
    {
      name: 'priceAdjustment',
      type: 'number',
      required: true,
      min: 0,
      label: 'Price Adjustment (+/-)',
      // You might consider making this field allow negative numbers if you have discounts as add-ons
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
  ],
}
