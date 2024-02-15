<template>
  <div>
    <SectionsCommonBreadrumbs :breadcrumbs="listing.breadcrumbs" />

    <div class="pb-10">
      <p class="uppercase text-[2rem] leading-[2.25rem] mb-10">{{ $t('inspirations') }}</p>
      <div class="text-sm leading-6 flex flex-col gap-6 sm:text-base" v-html="listing.header.body"></div>
    </div>

    <SectionsInspirationsCategories />
    <SectionsInspirationsFaq />
  </div>
</template>
  
<script setup>
import useSlideTo from '@/plugins/useSlideTo';

const inspirationStore = useInspirationStore();

const { listing } = inspirationStore;

provide('listing', listing);

onMounted(async () => {
  await inspirationStore.fetchListingData();

  useSlideTo();
})
</script>