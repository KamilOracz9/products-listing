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
    <SectionsHomeProductTiles />
    <SectionsHomeAboutTiles />
    <SectionsHomeLeftImage />
    <SectionsHomeRightImage />
    <div class="lg:grid lg:grid-cols-2 lg:gap-10">
      <SectionsHomeInOffer />
      <SectionsHomeAdditionalContent />
    </div>
    <SectionsHomeFindUs />

    <div class="my-10 sm:grid sm:grid-cols-2 sm:gap-4 lg:w-1/2 lg:mx-auto">
      <img src="@/assets/images/ue1c.webp" alt="">
      <img src="@/assets/images/ue2c.webp" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const homeStore = useHomeStore();

onMounted(() => {
  homeStore.fetchData();
});
</script>