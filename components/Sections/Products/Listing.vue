<template>
    <section>
        <ul class="grid gap-8 xs:grid-cols-2 sm:grid-cols-3 lg:mt-10 xl:grid-cols-4 2xl:grid-cols-5">
            <li v-for="product in products.slice((currentPage - 1) * perPage, perPage + ((currentPage - 1) * perPage))" class="border-b border-gray-2 pb-8">
                <NuxtLink :aria-label="product.name" :title="product.name"
                    :to="product.product_card" target="_blank">
                    <figure>
                        <div class="relative">
                            <SectionsProductsBadge :badge="product.badge" />
                            <img class="w-full rounded-br-sm aspect-[460/613]" :src="product.image" width="460"
                                height="613" :alt="product.name" :title="product.name">
                        </div>
                        <figcaption>
                            <p class="font-medium uppercase text-base pt-2 pb-3">{{ product.product_name }}</p>
                            <div class="text-sm text-gray-4" v-html="product.description_short"></div>
                        </figcaption>
                    </figure>
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
const props = defineProps(['products']);
const route = useRoute();

const perPage = 20;
const currentPage = computed(() => parseInt(route.query.page as string) || 1);

const { products } = toRefs(props);
</script>