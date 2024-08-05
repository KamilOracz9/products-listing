<template>
    <section>
        <ul class="grid gap-8 xs:grid-cols-2 sm:grid-cols-3 lg:mt-10 xl:grid-cols-4 2xl:grid-cols-5">
            <li v-for="product in products" class="border-b border-gray-2 pb-8" data-aos="fade-in">
                <NuxtLink :aria-label="product.name" :title="product.name"
                    :to="localePath({ name: 'products' }) + `/${product.slug}`">
                    <figure>
                        <div class="relative">
                            <SectionsProductsBadge :badge="product.badge" />
                            <img class="w-full rounded-br-sm" :src="product.media?.main['460_613']" :alt="product.name"
                                :title="product.name">
                        </div>
                        <figcaption>
                            <p class="font-medium uppercase text-base pt-2 pb-3">{{ product.name }}</p>
                            <div class="text-sm text-gray-4" v-html="product.description_short"></div>
                        </figcaption>
                    </figure>
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const props = defineProps(['products']);
const { products } = toRefs(props)
</script>