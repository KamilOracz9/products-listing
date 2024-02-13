<template>
    <section class="grid pt-6 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <NuxtLink :key="index" :to="aboutTile.url" v-for="(aboutTile, index) in homeStore.aboutTiles.items"
            @mouseenter="activeItem = index" class="px-8 py-6 sm:p-8" :class="activeItem === index ? 'bg-yellow-2' : 'bg-gray-2'">
            <div class="flex items-center justify-center ">
                <div class="max-w-[100px] flex justify-center">
                    <img :src="aboutTile.imageUrl" width="72" alt="" loading="lazy" />
                </div>
                <div class="uppercase flex-1 pl-4">
                    <p class="text-2xl">{{ aboutTile.subtitle }}</p>
                    <h3 class="text-[1.75rem] font-medium">{{ aboutTile.title }}</h3>
                </div>
            </div>
            <div class="hidden w-full xs:block xs:mt-4">
                <p>{{ aboutTile.description }}</p>
                <p class="uppercase pt-4 flex gap-2">{{ $t('more') }} <Arrow :direction="'right'" /></p>
            </div>
        </NuxtLink>
    </section>
</template>

<script setup>
const homeStore = useHomeStore();

const activeItem = ref(1);
</script>