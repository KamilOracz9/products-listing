<template>
    <section>
        <ul class="grid gap-8 xs:grid-cols-2 sm:grid-cols-3 lg:mt-10 xl:grid-cols-4 2xl:grid-cols-5">
            <li v-for="product in productStore.list.items" class="border-b border-gray-2 pb-8">
                <NuxtLink :aria-label="product.name" :title="product.name" :to="localePath({ name: 'products' }) + `/${product.slug}`">
                    <figure>
                        <div class="relative">
                            <SectionsProductsBadge :badge="product.badge" />
                            <img class="w-full rounded-br-sm" :src="product.imageUrl" :alt="product.name" :title="product.name">
                        </div>
                        <figcaption>
                            <p class="font-medium uppercase text-base pt-2 pb-3">{{ product.name }}</p>
                            <p class="text-sm text-gray-4">{{ product.shortDesc }}</p>
                        </figcaption>
                    </figure>
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup>
const productStore = useProductStore();
const localePath = useLocalePath();
</script>