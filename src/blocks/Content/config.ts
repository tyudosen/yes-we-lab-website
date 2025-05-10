import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { FormBlock } from '../Form/config'
import { OrderStatusBlock } from '../OrderStatusBlock/config'
import { ServicesBlock } from '../ServicesBlock/config'
import { AboutUsBlock } from '../AboutUsBlock/config'
import { GalleryBlock } from '../GalleryBlock/config'
import { ContactBlock } from '../ContactBlock/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        type: 'radio',
        label: 'Content type',
        name: 'contentType',
        options: [
          { label: 'Rich text', value: 'richText' },
          { label: 'Block', value: 'block' },
        ],
      },
    ],
  },
  {
    name: 'layout',
    type: 'blocks',
    maxRows: 1,
    blocks: [OrderStatusBlock, ServicesBlock, AboutUsBlock, GalleryBlock, AboutUsBlock, ContactBlock, FormBlock],
    required: true,
    admin: {
      initCollapsed: true,
      condition: (_, { contentType }) => contentType === 'block',
    },
  },
  {
    name: 'richText',
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
    }),
    label: false,
    admin: {
      condition: (_, { contentType }) => contentType === 'richText',
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_, { contentType }) => contentType === 'richText',
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
