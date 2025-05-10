import React from 'react'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Page } from '@/payload-types'


import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
    children?: React.ReactNode
    richText?: never
  }
  | (Omit<Page['hero'], 'richText'> & {
    children?: never
    richText?: Page['hero']['richText']
  })

export const HighImpactHeroV2: React.FC<LowImpactHeroType> = (props) => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 mx-auto md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Analog Film Development & Printing in Rome
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Professional film processing, high-resolution scanning, and archival printing services for photographers
              who value quality.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button>Our Services</Button>
              <Button variant="outline">Contact Us</Button>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Film development process"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

