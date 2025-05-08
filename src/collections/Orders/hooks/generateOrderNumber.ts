import { CollectionBeforeChangeHook } from 'payload'
import { randomBytes } from 'crypto'

// Define your order number prefix
const ORDER_PREFIX = 'ORD'
const RANDOM_SEQUENCE_LENGTH = 8

// Function to generate a random alphanumeric string of a given length
const generateRandomString = (length: number = RANDOM_SEQUENCE_LENGTH): string => {
  const bytes = randomBytes(Math.ceil(length / 2)) // Generate enough bytes for hex
  const hex = bytes.toString('hex')
  return hex.slice(0, length).toUpperCase() // Take the first 'length' hex characters and capitalize
}

// Hook to generate the order number
export const generateOrderNumber: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
}) => {
  if (operation === 'create') {
    let orderNumber = ''
    let isUnique = false
    const randomLength = 8 // Choose a suitable length for the random part

    // Keep generating until a unique number is found
    while (!isUnique) {
      const randomSeq = generateRandomString(randomLength)
      orderNumber = `${ORDER_PREFIX}-${randomSeq}`

      // Check if an order with this number already exists
      const existingOrder = await payload.find({
        collection: 'orders',
        where: {
          orderNumber: {
            equals: orderNumber,
          },
        },
        limit: 1, // We only need to know if one exists
      })

      if (existingOrder.docs.length === 0) {
        isUnique = true
      }
      // Add a small delay here in a real-world high-volume scenario to prevent tight loops
      // await new Promise(resolve => setTimeout(resolve, 10));
    }
    data.orderNumber = orderNumber
  }
  return data
}
