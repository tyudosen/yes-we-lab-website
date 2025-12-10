import type React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { SplashScreenBlock as SplashScreenBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { SidebarNav } from "@/components/SidebarNav"

export const SplashScreenBlock: React.FC<SplashScreenBlockProps> = (props) => {
  // const { columns } = props
  const {
    link,
    enableLink,
    // headingOne,
    tagLine
  } = props
  console.log('tagline -->', tagLine)

  // const colsSpanClasses = {
  //   full: '12',
  //   half: '6',
  //   oneThird: '4',
  //   twoThirds: '8',
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-balance font-mono text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Yes<span className="text-primary">We</span>Lab
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
          {tagLine}
        </p>
        <div className="mt-10 inline-flex items-center gap-2 font-mono text-primary hover:text-primary/80 transition-colors group">
          {enableLink && <CMSLink {...link}>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 ml-2" />
          </CMSLink>}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="container my-16">
  //     <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
  //       {columns &&
  //         columns.length > 0 &&
  //         columns.map((col, index) => {
  //           const { enableLink, link, richText, size } = col
  //
  //           return (
  //             <div
  //               className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
  //                 'md:col-span-2': size !== 'full',
  //               })}
  //               key={index}
  //             >
  //               {richText && <RichText data={richText} enableGutter={false} />}
  //
  //               {enableLink && <CMSLink {...link} />}
  //             </div>
  //           )
  //         })}
  //     </div>
  //   </div>
  // )
}
