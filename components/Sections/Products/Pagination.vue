<template>
    <section class="flex justify-end mt-10 mb-20 pagination">
        <ul class="flex uppercase text-lg">
            <li v-if="meta.current_page > 1">
                <NuxtLink :aria-label="meta.current_page - 1"
                    :to="localePath({ query: { ...router.currentRoute.value.query, page: meta.current_page - 1 } })"
                    class="pagination-button mr-4">
                    <Arrow :direction="'left'" class="rotate-90" />{{ $t('pagination.prev') }}
                </NuxtLink>
            </li>
            <li v-for="link in meta.links.slice(1, -1)"
                class="w-8 text-center border-r flex items-center justify-center border-gray-1" :class="link.active ? 'bg-gray-1' : ''">
                <NuxtLink v-if="link.url" :aria-label="link.label"
                    :to="localePath({ query: { ...router.currentRoute.value.query, page: link.label } })">
                    {{ link.label }}</NuxtLink>
                <span v-if="!link.url" class="w-8 text-center flex items-center justify-center ">
                    {{ link.label }}
                </span>
            </li>
            <li v-if="meta.current_page < meta.last_page">
                <!-- {{ setRelNext(localePath({ query: { ...router.currentRoute.value.query, page: meta.current_page + 1 } })) }} -->

                <NuxtLink :aria-label="meta.current_page + 1" rel="next" 
                    :to="localePath({ query: { ...router.currentRoute.value.query, page: meta.current_page + 1 } })"
                    class="pagination-button ml-4">
                    {{ $t('pagination.next') }}
                    <Arrow :direction="'right'" class="-rotate-90" />
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
const props = defineProps(['meta'])
const { meta } = toRefs(props);
const localePath = useLocalePath();
const router = useRouter();
</script>