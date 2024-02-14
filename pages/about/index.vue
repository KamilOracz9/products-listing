<template>
  <div v-if="!aboutStore.isLoading">
    <SectionsCommonBreadrumbs :breadcrumbs="aboutStore.breadcrumbs" />
    <SectionsAboutStory />

    <section class="mt-10">
      <p class="section-title">{{ $t('pages.about.awards') }}</p>
      <div class="section-text" v-html="aboutStore.sections?.awards.body"></div>
      <div class="overflow-x-auto no-scrollbar">
        <div class="flex lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <img v-for="(image, index) in aboutStore.sections?.awards.images" :key="index"
            class="min-w-[216px] max-w-[216px] aspect-1/1 w-full h-full" :src="image" alt="">
        </div>
      </div>
    </section>

    <section class="xl:w-1/2">
      <p class="section-title">{{ $t('pages.about.career') }}</p>
      <div class="section-text" v-html="aboutStore.sections?.career.body"></div>
    </section>

    <section class="mt-10">
      <p class="section-title">{{ $t('pages.about.projects') }}</p>
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