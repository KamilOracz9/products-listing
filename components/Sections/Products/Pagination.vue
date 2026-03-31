<template>
    <section class="flex justify-end mt-10 mb-20 pagination">
        <ul class="flex uppercase text-lg">
            <li v-if="currentPage > 1">
                <NuxtLink :aria-label="currentPage - 1"
                    :to="pageRoute(currentPage - 1)"
                    class="pagination-button mr-4">
                    <Arrow :direction="'left'" class="rotate-90" />{{ $t('pagination.prev') }}
                </NuxtLink>
            </li>
            <li v-for="item in pagItems" :key="item"
                class="w-8 text-center border-r flex items-center justify-center border-gray-1"
                :class="item === currentPage ? 'bg-gray-1' : ''">
                <span v-if="item === '...'" class="w-8 text-center flex items-center justify-center">
                    &hellip;
                </span>
                <NuxtLink v-else :aria-label="`${item}`" :to="pageRoute(item)">
                    {{ item }}
                </NuxtLink>
            </li>
            <li v-if="currentPage < totalPages">
                <NuxtLink :aria-label="currentPage + 1" rel="next"
                    :to="pageRoute(currentPage + 1)"
                    class="pagination-button ml-4">
                    {{ $t('pagination.next') }}
                    <Arrow :direction="'right'" class="-rotate-90" />
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  perPage: number
  currentPage: number
  productsCount: number
}>()

const localePath = useLocalePath()
const router = useRouter()

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.productsCount / props.perPage))
)

const pagItems = computed<(number | '...')[]>(() => {
  const total = totalPages.value
  const cur = props.currentPage

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = new Set([1, total, cur, cur - 1, cur + 1].filter(p => p >= 1 && p <= total))
  const sorted = [...pages].sort((a, b) => a - b)

  const result: (number | '...')[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) result.push('...')
    result.push(p)
    prev = p
  }
  return result
})

const pageRoute = (page: number) =>
  localePath({ query: { ...router.currentRoute.value.query, page } })

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>