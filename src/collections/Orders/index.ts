import { admin } from '@/access/admin'
import { user } from '@/access/user'
import { CollectionConfig } from 'payload'
import { generateOrderNumber } from './hooks/generateOrderNumber'
import { Effect, pipe, HashMap, Option, Array as EArray, HashSet } from 'effect'
import { Order, Service } from '@/payload-types'

class ServiceError extends Error {
  readonly _tag = 'ServiceError'
  constructor(override readonly message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

class FetchError extends Error {
  readonly _tag = 'FetchError'
  constructor(readonly originalError: unknown) {
    super(String(originalError))
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
  },
  access: {
    read: user,
    update: user,
    delete: admin,
    create: user,
  },
  hooks: {
    beforeChange: [
      generateOrderNumber,
      async ({ data, req: { payload }, operation }) => {
        const fetchService = (id: number | null | undefined) => {
          if (!id) return Effect.fail(new ServiceError('id is undefined'))
          return Effect.tryPromise({
            try: () =>
              payload.findByID({
                collection: 'services',
                id,
                depth: 0,
              }),
            catch: (error) => new FetchError(error),
          })
        }

        const createServiceMapFromItemsPure = (items: NonNullable<Order['items']>) => {
          // Add Payload to R type
          return pipe(
            // Step 1: Separate existing Services from IDs and collect unique IDs
            Effect.sync(() => {
              const existingServices: Array<{ id: number; service: Service }> = []
              const serviceIds: number[] = []

              EArray.forEach(items, (item) => {
                // Use forEach for side effects (pushing to arrays)
                if (typeof item.service === 'number') {
                  serviceIds.push(item.service)
                } else {
                  existingServices.push({ id: item.service.id, service: item.service })
                }
              })

              // Get unique IDs that need fetching
              const uniqueFetchIds = HashSet.fromIterable(serviceIds)

              return { existingServices, uniqueFetchIds }
            }),
            // Step 2: Fetch services for unique IDs concurrently
            Effect.flatMap(({ existingServices, uniqueFetchIds }) => {
              // Create an array of fetchService Effects for the unique IDs
              const fetchEffects = HashSet.map(uniqueFetchIds, (id) => fetchService(id))
              // Run the fetch effects concurrently
              return Effect.all(fetchEffects, { concurrency: 'unbounded' }).pipe(
                Effect.map((fetchedServices) => {
                  // Combine existing services and newly fetched services
                  const allServices = [
                    ...existingServices.map((s) => s.service),
                    ...fetchedServices,
                  ] // Extract Service objects

                  // Create a new HashMap from all the services
                  return HashMap.fromIterable(
                    allServices.map((s) => [s.id, s] as [number, Service]),
                  ) // Create [id, service] pairs
                }),
              )
            }),
          )
        }

        const processItem = (
          item: NonNullable<Order['items']>[0],
          servicesMap: HashMap.HashMap<number, Service>,
        ) => {
          return pipe(
            Effect.sync(() => {
              if (typeof item.service === 'number') {
                return HashMap.get(servicesMap, item.service)
              } else {
                return Option.some(item.service)
              }
            }),
            Effect.flatMap((foundOption) => {
              return Option.match(foundOption, {
                onNone: () => Effect.fail(new ServiceError('service failed')),
                onSome: (foundOption) => {
                  const unitPrice = foundOption.basePrice
                  const quantity = item.quantity
                  const subtotal = unitPrice * (quantity ?? 1)

                  const updatedItem = {
                    ...item,
                    unitPrice,
                    subtotal,
                  }

                  return Effect.succeed(updatedItem)
                },
              })
            }),
          )
        }

        const processOrderData = (
          data: Order,
          operation: 'create' | 'update' | 'other',
        ): Effect.Effect<Order, ServiceError | FetchError, never> => {
          if (operation === 'create' || operation === 'update') {
            const itemsToProcess = data?.items

            if (!itemsToProcess || itemsToProcess.length === 0) {
              return Effect.succeed(data) // Return original data if no items
            }

            return pipe(
              // Step 1: Create the servicesById HashMap based on the items (using the Effect function)
              createServiceMapFromItemsPure(itemsToProcess),
              // Step 2: Use flatMap to get the servicesById HashMap and then process items
              Effect.flatMap((servicesById) => {
                // Now we have the servicesById map, process each item
                const itemProcessingEffects = itemsToProcess.map((item) =>
                  processItem(item, servicesById),
                )
                // Run all item processing effects concurrently
                return Effect.all(itemProcessingEffects, { concurrency: 'unbounded' })
              }),
              // Step 3: Use map to update the data object with the processed items
              // This map will receive the array of updated items from Effect.all
              Effect.map((processedItems) => {
                const totalAmount = processedItems.reduce((acc, curr) => acc + curr.subtotal, 0)
                // Create a new data object with the updated items (immutable update)
                const updatedData: Order = {
                  ...data,
                  totalAmount,
                  items: processedItems,
                }
                return updatedData // Return the updated data as the success value
              }),
            )
          } else {
            // If operation is not create or update, just return the original data
            return Effect.succeed(data)
          }
        }

        return await Effect.runPromise(processOrderData(data as Order, operation))
      },
    ],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      admin: {
        readOnly: true,
      },
      label: 'Total',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          // required: true,
          min: 1,
        },
        {
          name: 'unitPrice',
          type: 'number',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.unitPrice),
          },
          required: true,
          min: 0,
        },
        {
          name: 'subtotal',
          type: 'number',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.subtotal),
          },
          required: true,
          min: 0,
        },
      ],
    },
  ],
}
