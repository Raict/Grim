import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client"
import { defineNuxtPlugin } from "#app"
import type { AppRouter } from "~/server/trpc/routes"

export default defineNuxtPlugin(() => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
