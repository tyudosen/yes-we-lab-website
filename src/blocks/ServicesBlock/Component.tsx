import { Camera, Scan, Printer } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ServicesBlock() {
  return (
    <section id="services" className="py-20 bg-card">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              We offer a complete range of analog photography services with meticulous attention to detail.
            </p>
          </div>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <Camera className="w-10 h-10 mb-2" />
              <CardTitle className="text-xl font-semibold">Film Development</CardTitle>
              <CardDescription>
                Professional development for all film formats and types, including C-41, B&W, and E-6.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>35mm, 120, and large format</li>
                <li>Color and black & white</li>
                <li>Push/pull processing</li>
                <li>Cross processing</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Scan className="w-10 h-10 mb-2" />
              <CardTitle className="text-xl font-semibold">High-Res Scanning</CardTitle>
              <CardDescription>
                Premium scanning services to digitize your negatives with exceptional detail and color accuracy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Drum scanning</li>
                <li>Flatbed scanning</li>
                <li>Digital ICE technology</li>
                <li>Color correction</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Printer className="w-10 h-10 mb-2" />
              <CardTitle className="text-xl font-semibold">Archival Printing</CardTitle>
              <CardDescription>
                Museum-quality prints on premium papers for exhibitions, portfolios, and personal collections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Giclée fine art prints</li>
                <li>Silver gelatin prints</li>
                <li>C-type prints</li>
                <li>Custom sizes available</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

