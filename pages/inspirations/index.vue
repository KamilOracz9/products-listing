<template>
  <div>
    <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

    <div class="pb-10">
      <p class="uppercase text-[2rem] leading-[2.25rem] mb-10">{{ title }}</p>
      <div class="text-sm leading-6 flex flex-col gap-6 sm:text-base" v-html="description.content.intro"></div>
    </div>

    <SectionsInspirationsCategories :categories="description.content.categories" />
    <SectionsInspirationsFaq :faq="description.content.faq" />
  </div>
</template>

<script setup lang="ts">
import { fetchInspirationCategories } from '~/services/api';
import type { InspirationCategoriesPage } from '~/types/inspirations.types';

const { data } = await useAsyncData('inspiration-categories', () => fetchInspirationCategories());
const { breadcrumbs, description, meta, title } = toRefs(data.value as InspirationCategoriesPage);

setMeta(meta.value);
</script>