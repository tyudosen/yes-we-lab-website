import { getPayload } from 'payload'
import config from '@payload-config'
import { CardHeader, Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Package, Clock, Camera, ImageIcon, ArrowRight, PlusCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress/progress'
import { useAuth } from '@/providers/Auth'
import { getMeUser } from '@/utilities/getMeUser'

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

const statusToProgressMap = {
  'PENDING': 0,
  'PROCESSING': 50,
  'COMPLETE': 100
} as const

const payload = await getPayload({ config })

interface OrderStatusBlockProps { }

export const OrderStatusBlock: React.FC<OrderStatusBlockProps> = async () => {
  const { user } = await getMeUser();
  const { docs } = await payload.find({
    collection: 'orders',
    overrideAccess: false,
    user,
    where: {
      'placedBy.id': {
        equals: user?.id
      }
    },
    pagination: false,
    limit: 5
  })
  const { docs: media } = await payload.find({
    collection: 'media',
    overrideAccess: false,
    user
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
        {
          !docs.length ? (
            /* Empty state */
            <div className="py-12 flex flex-col items-center justify-center text-center border border-dashed border-border/60 rounded-lg">
              <div className="p-3 rounded-full bg-secondary/50 mb-4">
                <PlusCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No orders yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm mb-4">
                When you place an order for film development or prints, it will appear here
              </p>
              <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Place your first order
              </button>
            </div>
          ) : (docs.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-lg border border-border/60 hover:border-border transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium">{order?.orderNumber}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/50">{order.status}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                {/* <span>Order #{order.id}</span> */}
                <span>{statusToProgressMap[order?.status ?? 'PENDING']}% complete</span>
              </div>
              <div className="w-full h-1 bg-secondary/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${statusToProgressMap[order?.status ?? 'PENDING']}%`
                  }}
                />
              </div>
            </div>
          )))
        }
      </div>
    </section>
  )
}




//

