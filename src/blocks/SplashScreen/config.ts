import type { Block } from 'payload'

// import {
//   FixedToolbarFeature,
//   HeadingFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
// } from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const SplashScreen: Block = {
  slug: 'splashScreenBlock',
  labels: {
    singular: 'Splash screen',
    plural: 'Splash screens',
  },
  interfaceName: 'SplashScreenBlock',
  fields: [
    // {
    //   label: 'Heading One',
    //   name: 'headingOne',
    //   type: 'richText',
    //   editor: lexicalEditor({
    //     features: ({ rootFeatures }) => {
    //       return [
    //         ...rootFeatures,
    //         HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
    //         FixedToolbarFeature(),
    //         InlineToolbarFeature()
    //       ]
    //     }
    //   })
    // },
    {
      label: "Tag Line",
      name: 'tagLine',
      type: 'text',
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => {
            return Boolean(siblingData?.enableLink)
          },
        },
      },
    })
  ],
}
