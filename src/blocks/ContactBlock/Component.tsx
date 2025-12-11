import type React from "react"
import RichText from '@/components/RichText'
import type { ContactBlock as ContactBlockProps } from '@/payload-types'
import { CMSLink } from '../../components/Link'
import { Clock, Facebook, Instagram, Mail, MapPin } from "lucide-react"

export const ContactBlock: React.FC<ContactBlockProps> = (props) => {
  const {
    doveSiamo,
    email,
    heading,
    orari,
    socialLinks
  } = props

  const iconsToSocial: Record<string, React.ReactElement> = {
    'instagram': <Instagram className="w-5 h-5" />,
    'facebook': <Facebook className="w-5 h-5" />
  }

  return (
    <article className="flex justify-center px-6 md:px-12 lg:px-16 py-8 md:py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <section className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">CONTATTI</h1>
          {heading && <RichText data={heading} enableGutter={false} />}
        </section>

        {/* Contact Info */}
        <section className="mb-14">
          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">EMAIL</h2>
                {email && <RichText data={email} enableGutter={false} className="hover:text-primary transition-colors" />}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">DOVE SIAMO</h2>
                {doveSiamo && <RichText data={doveSiamo} enableGutter={false} />}
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">ORARI</h2>
                {orari && <RichText data={orari} enableGutter={false} />}
              </div>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="mb-14 pt-8 border-t border-foreground/10">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">SEGUICI</h2>
          <div className="flex justify-center gap-6">
            {
              (socialLinks || []).map(({ link }, index) => (
                <CMSLink
                  key={index}
                  {...link}
                  iconFirst={true}
                  className="flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors"
                >
                  {link.label && iconsToSocial[link.label.toLowerCase()]}
                </CMSLink>
              ))
            }
          </div>
        </section>


        <section className="pt-8 border-t border-foreground/10">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">SERVICI</h2>
        </section>


        <section className="border-foreground/10 text-center">
          <p className="text-foreground/70 text-sm italic">
            RISPONDIAMO SOLITAMENTE ENTRO 24-48 ORE. PER URGENZE, CONTATTATECI TELEFONICAMENTE.
          </p>
        </section>
      </div>
    </article>
  )
}
