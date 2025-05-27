import { Effect } from 'effect'
import type { User } from '../../payload-types'

export const rest = (
  url: string,
  args?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  options?: RequestInit,
): Effect.Effect<User, Error, never> => {
  const method = options?.method || 'POST'


  const fetchEffect = () => Effect.tryPromise({
    try: () => fetch(url, {
      method,
      ...(method === 'POST' ? { body: JSON.stringify(args) } : {}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    }),
    catch: (e) => new Error(`Fetch error ${e}`)
  })


  const jsonEffect = (response: Response) => Effect.tryPromise({
    try: () => response.json(),
    catch: (e) => new Error(`JSON Parse Error: ${e}`)
  })

  const program = fetchEffect().pipe(
    Effect.flatMap((res) => {
      if (!res.ok) {
        return Effect.fail(new Error('HTTP Error'))
      }

      return Effect.succeed(res)
    }),
    Effect.flatMap(jsonEffect),
    Effect.flatMap(({ user, errors }) => {
      if (errors) {
        return Effect.fail(new Error(`Server Error: ${errors}`))
      }

      // if (!user) {
      //   return Effect.fail(new Error("Response missing user data"))
      // }

      return Effect.succeed(user)
    })
  )

  return program

}
