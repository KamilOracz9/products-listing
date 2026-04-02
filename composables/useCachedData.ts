const CACHE_TTL = 60 * 1000

interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface CacheMeta {
  timestamp: number
}

export function useCachedData<T>(key: MaybeRef<string>, fetcher: () => Promise<T>) {
  const nuxtApp = useNuxtApp()
  const resolvedKey = computed(() => toValue(key))

  const cache = useState<Record<string, CacheEntry<unknown>>>('__app_cache__', () => ({}))

  function getMeta(k: string): CacheMeta | null {
    if (!import.meta.client) return null
    const raw = sessionStorage.getItem(`__meta__${k}`)
    return raw ? JSON.parse(raw) : null
  }

  function setMeta(k: string) {
    if (!import.meta.client) return
    sessionStorage.setItem(`__meta__${k}`, JSON.stringify({ timestamp: Date.now() }))
  }

  function getCache(k: string): T | null {
    // 1. useState — nawigacja SPA
    if (cache.value[k]) return cache.value[k].data as T

    // 2. payload SSR — pierwsze wejście
    const payload = nuxtApp.payload.data[k] ?? nuxtApp.static.data[k]
    if (payload) {
      // przenieś payload do useState żeby był dostępny przy kolejnych nawigacjach
      cache.value[k] = { data: payload, timestamp: Date.now() }
      setMeta(k)
      return payload
    }

    return null
  }

  function setCache(k: string, data: T) {
    cache.value[k] = { data, timestamp: Date.now() }
    nuxtApp.payload.data[k] = data
    setMeta(k)
  }

  function isStale(k: string): boolean {
    // sprawdź useState najpierw
    if (cache.value[k]) {
      return Date.now() - cache.value[k].timestamp > CACHE_TTL
    }

    // po F5 useState pusty — sprawdź meta czy dane są świeże
    const meta = getMeta(k)
    if (meta) {
      return Date.now() - meta.timestamp > CACHE_TTL
    }

    return true
  }

  async function revalidate(k: string) {
    const fresh = await fetcher()
    setCache(k, fresh)
  }

  return useAsyncData<T>(resolvedKey, fetcher, {
    lazy: !import.meta.server,
    getCachedData(k) {
      const cached = getCache(k)

      if (cached !== null && cached !== undefined) {
        if (isStale(k)) revalidate(k)
        return cached
      }

      // brak danych w useState — ale meta mówi że są świeże (np. po F5)
      // pozwól fetchować, ale nie blokuj — dane przyjdą przez lazy
      return null
    }
  })
}