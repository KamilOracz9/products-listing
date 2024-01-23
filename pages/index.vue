<template>
  <div>
    <NuxtLink :to="localePath({ name: 'place-to-buy' })" class="flex text-[.7rem] mt-8 mb-7 xs:text-sm md:text-xl">
      <span
        class="bg-black-2 text-white px-2 rounded-tl-xs hover:bg-yellow transition-all xs:px-4 xs:py-2  md:rounded-tl-sm md:px-5 md:py-3">konfiguratorkabin.pl</span>
      <span class="px-2 uppercase font-medium xs:px-4 xs:py-2 md:px-5 md:py-3">{{ $t('made-to-measure-home-link')
      }}</span>
    </NuxtLink>

    <SectionsHomeSwiper />
    <SectionsHomeCategories />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const homeStore = useHomeStore();

onMounted(() => {
  homeStore.fetchData();
});
</script>