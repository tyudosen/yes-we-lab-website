import { getPayload } from 'payload'
import config from '@payload-config'
import { CardHeader, Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Package, Clock, Camera, ImageIcon } from 'lucide-react'
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

interface OrderStatusBlockProps {}

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Current Orders
        </CardTitle>
        <CardDescription>Track the status of your active orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {currentOrders.map((order) => (
            <div key={order.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <order.icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">{order.service}</h4>
                    <p className="text-xs text-muted-foreground">
                      {order.id} • {order.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{order.status}</span>
                </div>
              </div>
              <Progress value={order.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
