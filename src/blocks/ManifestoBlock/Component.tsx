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
    <div className="flex justify-center px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <div className="w-full max-w-3xl text-center">

        <span className="block font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
          {smallHeading}
        </span>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 text-balance">
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
      </div>
    </div>
  )
}
