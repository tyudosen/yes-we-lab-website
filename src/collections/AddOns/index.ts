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
    {
      name: 'priceAdjustment',
      type: 'number',
      required: true,
      label: 'Price Adjustment (+/-)',
      // You might consider making this field allow negative numbers if you have discounts as add-ons
      admin: {
        description: 'Positive values increase the price, negative values create discounts',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
  ],
}
