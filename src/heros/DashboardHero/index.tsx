import { getMeUser } from "@/utilities/getMeUser"
import { getPayload } from 'payload'
import config from '@payload-config'
import pluralize from 'pluralize';



export const DashboardHero = async () => {
  const payload = await getPayload({ config })
  const { user } = await getMeUser();
  const { name, id } = user;
  const { totalDocs: orderCount } = await payload.count({
    collection: 'orders',
    overrideAccess: false,
    user,
    where: {
      'placedBy.id': {
        equals: id
      }
    }
  })

  return <section className="mb-16">
    <h1 className="text-3xl font-light mb-2">{`Hello, ${name}`}</h1>
    <p className="text-muted-foreground">{`You have ${orderCount} ${pluralize('order', orderCount)} in progress`}</p>
  </section>
}
