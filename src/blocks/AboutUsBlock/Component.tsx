import { MapPin, Clock, Calendar } from "lucide-react"
import Image from "next/image"

export function AboutUsBlock() {
  return (
    <section id="about" className="py-20">
      <div className="container px-4 mx-auto md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=600&width=600" alt="Our lab in Rome" fill className="object-cover" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Located in the Heart of Rome</h2>
            <p className="text-muted-foreground md:text-xl">
              Established in 2010, Luce Film Lab has been serving photographers in Rome with premium analog services.
              Our team of experienced technicians brings decades of darkroom expertise to every project.
            </p>
            <div className="grid gap-4 pt-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium text-base">Address</h3>
                  <p className="text-sm text-muted-foreground">Via del Corso 123, 00186 Rome, Italy</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium text-base">Opening Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday–Friday: 10:00–18:00
                    <br />
                    Saturday: 11:00–16:00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium text-base">Turnaround Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Development: 1-2 days
                    <br />
                    Scanning: 2-3 days
                    <br />
                    Printing: 3-5 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

