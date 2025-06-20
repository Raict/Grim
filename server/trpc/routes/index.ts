import { router } from "../trpc"
import { faviconRouter } from "./favicon"

export const appRouter = router({
  favicon: faviconRouter,
})

export type AppRouter = typeof appRouter
