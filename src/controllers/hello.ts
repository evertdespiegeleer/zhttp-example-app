import { z } from 'zod'
import { controller, get, zApiOutput, apiResponse } from '@zhttp/core'

const zHelloResponse = zApiOutput(
  z.object({
    greeting: z.string().openapi({ example: 'Hello Joske!' })
  })
).openapi('HelloResponse')

export const helloController = controller('Hello').description(
  'This controller says hello to everyone'
)

helloController.endpoint(
  get('/hello', 'sayHello')
    .input({
      params: z.object({
        name: z.string().optional()
      })
    })
    .response(zHelloResponse)
    .handler(async (input) => {
      return apiResponse({
        // Both the input object ⬇ and the handler response are strongly typed :)
        // Try changing something!
        greeting: `Hello ${input.params.name ?? 'everybody'}!`
      })
    })
)

helloController.endpoint(
  get('/goodbye', 'sayGoodbye')
    .input({
      params: z.object({
        // ⬇ In this case, `name` is not an optional prop.
        // Try calling the endpoint without it and see validation in action!
        name: z.string()
      })
    })
    .response(zHelloResponse)
    .handler(async (input) => {
      return apiResponse({
        greeting: `Goobye ${input.params.name ?? 'everybody'}!`
      })
    })
)
