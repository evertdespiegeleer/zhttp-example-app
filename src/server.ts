import { z } from 'zod'
import { Server, openapiController, extendZodWithOpenApi } from '@zhttp/core'
import { helloController } from './controllers/hello.js'

extendZodWithOpenApi(z)

export const server = new Server(
  {
    controllers: [
      openapiController,
      helloController
    ],
    middlewares: []
  },
  {
    port: 3000,
    bypassAllowedOrigins: true,
    oasInfo: {
      title: 'A very cool api',
      version: '1.0.0'
    }
  }
)
