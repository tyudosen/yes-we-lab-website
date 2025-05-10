import { Mail, Phone, Instagram } from "lucide-react"

export function ContactBlock() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
      <p className="text-muted-foreground md:text-xl">
        Have questions about our services or want to book an appointment? Reach out to us.
      </p>
      <div className="grid gap-4 pt-4">
        <div className="flex items-center gap-4">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <a href="mailto:info@lucefilmlab.com" className="text-muted-foreground hover:text-foreground">
            info@lucefilmlab.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <a href="tel:+390123456789" className="text-muted-foreground hover:text-foreground">
            +39 01 2345 6789
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Instagram className="w-5 h-5 text-muted-foreground" />
          <a href="https://instagram.com/lucefilmlab" className="text-muted-foreground hover:text-foreground">
            @lucefilmlab
          </a>
        </div>
      </div>
    </div>
  )
}

