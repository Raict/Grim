import { createNuxtApiHandler } from "trpc-nuxt"
import { appRouter } from "~/server/trpc/routes"

export default createNuxtApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
