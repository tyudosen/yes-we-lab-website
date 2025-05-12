import { ArrowRight, PlusCircle } from "lucide-react"

export const QuickActions = () => {

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-medium">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="flex items-center justify-between p-4 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <PlusCircle className="h-4 w-4 text-primary" />
            </div>
            <span>New Order</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <button className="flex items-center justify-between p-4 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-colors text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <svg
                className="h-4 w-4 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span>Upload Photos</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </section>
  )
}
