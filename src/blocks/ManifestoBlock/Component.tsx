import type React from "react"
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { ManifestoBlock as ManifestoBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'

export const ManifestoBlock: React.FC<ManifestoBlockProps> = (props) => {
  const {
    smallHeading,
    largeHeading,
    columns,
  } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 md:ml-56 flex flex-col px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 text-center md:text-left">
          {smallHeading}
        </span>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 text-balance text-center md:text-left">
          {largeHeading}
        </h2>

        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16 max-w-3xl">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                    'md:col-span-2': size !== 'full',
                  })}
                  key={index}
                >
                  {richText && <RichText data={richText} enableGutter={false} />}

                  {enableLink && <CMSLink {...link} className="self-center md:self-start relative border border-primary bg-transparent
                    px-10 py-4 font-mono text-sm uppercase tracking-widest text-primary transition-colors hover:bg-primary
                    hover:text-primary-foreground">
                    <span className="absolute inset-0 animate-pulse border border-primary opacity-50" />
                  </CMSLink>}
                </div>
              )
            })}
        </div>
      </main>
    </div>
  )
}
