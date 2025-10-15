export default defineNuxtPlugin(() => {
  const runtime = useRuntimeConfig()
  const route = useRoute()

  watchEffect(() => {
    const origin = runtime.public.siteUrl || 'https://favicon-gen.com'
    const cleanPath = route.path.replace(/\/+$/, '') || '/'
    const href = origin + (cleanPath === '/' ? '/' : cleanPath)

    useHead({ link: [{ rel: 'canonical', href }] })
  })
})
