import { getPayload } from 'payload'
import config from '@payload-config'
import { CardHeader, Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Package, Clock, Camera, ImageIcon, ArrowRight } from 'lucide-react'
import { Progress } from '@/components/ui/progress/progress'

const currentOrders = [
  {
    id: 'ORD-7829',
    service: 'Film Development & Scanning',
    status: 'Processing',
    progress: 60,
    date: 'May 2, 2025',
    icon: Camera,
  },
  {
    id: 'ORD-7830',
    service: 'Photo Prints (8x10)',
    status: 'Printing',
    progress: 40,
    date: 'May 3, 2025',
    icon: ImageIcon,
  },
]

const payload = await getPayload({ config })

interface OrderStatusBlockProps { }

export const OrderStatusBlock: React.FC<OrderStatusBlockProps> = async () => {
  const result = await payload.find({
    collection: 'posts', // required
    depth: 2,
    // page: 1,
    // limit: 10,
    // pagination: false, // If you want to disable pagination count, etc.
    // where: {}, // pass a `where` query here
    // sort: '-title',
    // locale: 'en',
    // fallbackLocale: false,
    // user: dummyUser,
    // overrideAccess: false,
    // showHiddenFields: true,
  })

  return (
    <section className="mb-16 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Orders</h2>
        <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          View all
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid gap-4">
        {[
          { id: "7829", service: "Film Development", status: "Processing", progress: 60 },
          { id: "7830", service: "Photo Prints", status: "Printing", progress: 40 },
        ].map((order) => (
          <div
            key={order.id}
            className="p-4 rounded-lg border border-border/60 hover:border-border transition-colors"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">{order.service}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/50">{order.status}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
              <span>Order #{order.id}</span>
              <span>{order.progress}% complete</span>
            </div>
            <div className="w-full h-1 bg-secondary/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${order.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
