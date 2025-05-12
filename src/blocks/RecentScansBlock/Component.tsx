import { ArrowRight } from "lucide-react"

export const RecentScans = () => {

  return (
    <section className="mb-16 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Scans</h2>
        <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View all
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-md bg-secondary/30 mb-2">
              <img
                src={`/placeholder.svg?height=300&width=300`}
                alt={`Scan ${id}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-sm truncate">Roll #{id}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
