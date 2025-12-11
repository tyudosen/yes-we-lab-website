import type { Block } from 'payload'
import { columnFields } from '@/fields/column'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  interfaceName: 'ContactBlock',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      })
    },
    {
      name: 'email',
      label: 'Email',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      })
    },
    {
      name: 'doveSiamo',
      label: 'Dove Siamo',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      })
    },
    {
      name: 'orari',
      label: 'Orari',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      })

    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      fields: [
        link()
      ]
    }
  ],
}
