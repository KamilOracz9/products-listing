<template>
  <div v-if="!aboutStore.isLoading">
    <SectionsCommonBreadrumbs :breadcrumbs="aboutStore.breadcrumbs" />
    <SectionsAboutStory />

    <section class="mt-10 lg:mt-0">
      <p class="section-title">{{ $t('pages.about.awards') }}</p>
      <div class="section-text" v-html="aboutStore.sections?.awards.body"></div>
      <div class="overflow-x-auto no-scrollbar">
        <ul class="flex lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <li v-for="(image, index) in aboutStore.sections?.awards.images" :key="index"
            class="min-w-[216px] max-w-[216px] aspect-1/1">
            <img class="w-full h-full" :src="image" alt="">
          </li>
        </ul>
      </div>
    </section>

    <section class="xl:w-1/2">
      <p class="section-title">{{ $t('pages.about.career') }}</p>
      <div class="section-text" v-html="aboutStore.sections?.career.body"></div>
    </section>

    <section>
      <p class="section-title mb-0">{{ $t('pages.about.career') }}</p>
      <div class="grid xl:grid-cols-2 gap-6 section-text lg:gap-10">
        <div v-html="aboutStore.sections?.projects.bodyLeft"></div>
        <div v-html="aboutStore.sections?.projects.bodyRight"></div>
      </div>
    </section>

    <SectionsCommonUE />
  </div>
</template>
  
<script setup lang="ts">
const aboutStore = useAboutStore();

provide('aboutStore', aboutStore);

onMounted(async () => {
  await aboutStore.fetchData();
})
</script>