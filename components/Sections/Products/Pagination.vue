<template>
    <section class="flex justify-end mt-10 mb-20 pagination">
        <ul class="flex uppercase text-lg">
            <li class="">
                <NuxtLink :to="localePath({ name: 'products' })" class="pagination-button mr-4">
                    <Arrow :direction="'left'" class="rotate-90" />{{ $t('pagination.prev') }}
                </NuxtLink>
            </li>
            <li v-for="pageNumber in 5" class="w-8 text-center border-r flex items-center justify-center border-gray-1">
                <NuxtLink @click="page = pageNumber"
                    :to="localePath({ name: 'products', query: { ...router.currentRoute.value.query, page: pageNumber } })">
                    {{ pageNumber }}</NuxtLink>
            </li>
            <li class="">
                <NuxtLink :to="localePath({ name: 'products' })" class="pagination-button ml-4">
                    {{ $t('pagination.next') }}
                    <Arrow :direction="'right'" class="-rotate-90" />
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup>
const localePath = useLocalePath();
const router = useRouter();
const page = ref(1);
</script>