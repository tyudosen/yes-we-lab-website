export const RecentScans = () => {

  return (
    <section className="mb-16 space-y-6">
      {false ? (
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
      ) : (
        /* Empty state */
        <div className="py-12 flex flex-col items-center justify-center text-center border border-dashed border-border/60 rounded-lg">
          <div className="p-3 rounded-full bg-secondary/50 mb-4">
            <svg
              className="h-6 w-6 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No scans available</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            When your film is developed and scanned, the images will appear here
          </p>
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Place an order
          </button>
        </div>
      )}    </section>
  )
}
