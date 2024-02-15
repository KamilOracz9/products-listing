
<template>
    <section class="my-5 flex overflow-x-auto no-scrollbar">
        <NuxtLink v-for="(category, index) in homeStore.categories.items" data-aos="fade-up" :data-aos-delay="100 * index" :key="index"
            class="border-l-2 px-5 text-medium-lg uppercase flex items-center xs:pr-20 sm:pr-40 sm:text-xl lg:pr-5 lg:flex-1"
            :to="{ path: localePath({ name: 'categories' }) + `/${category.slug}` }"
            v-html="category.label.replace('-', '&#8209;')"></NuxtLink>
    </section>
</template>

<script setup>
const homeStore = useHomeStore();
const localePath = useLocalePath();
</script>