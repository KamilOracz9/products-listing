
<template>
    <section class="my-5">
        <ul class="flex overflow-x-auto no-scrollbar">
            <li v-for="category in homeStore.categories.items" class="border-l-2 px-5 text-medium-lg uppercase flex items-center xs:pr-20 sm:pr-40 sm:text-xl lg:pr-5 lg:flex-1">
                <NuxtLink :to="'/'">{{ category.label.replace('-', '&#8209;') }} </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup>
    const localePath = useLocalePath();
    const homeStore = useHomeStore();
</script>