import Image from "next/image"

export function GalleryBlock() {
  return (
    <section id="gallery" className="py-20 bg-card">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Work</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A selection of photographs processed and printed at our lab.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-12 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-md">
              <Image
                src={`/placeholder.svg?height=400&width=400&text=Photo+${i}`}
                alt={`Gallery image ${i}`}
                fill
                className="object-cover transition-all hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

