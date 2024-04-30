<template>
  <div>
    <NuxtLink :to="localePath({ name: 'place-to-buy' })" aria-label="konfiguratorkabin.pl"
      class="flex text-[.7rem] mt-8 mb-7 xs:text-sm md:text-xl md:w-fit">
      <span
        class="bg-black-2 text-white px-2 rounded-tl-xs hover:bg-yellow-2 transition-all xs:px-4 xs:py-2  md:rounded-tl-sm md:px-5 md:py-3">konfiguratorkabin.pl</span>
      <span class="px-2 uppercase font-medium xs:px-4 xs:py-2 md:px-5 md:py-3">{{ $t('made-to-measure-home-link')
        }}</span>
    </NuxtLink>

    <SectionsHomeSwiper :data="slides" />
    <SectionsHomeCategories :data="categories" />
    <SectionsHomeProductTiles :data="collections" />
    <SectionsHomeAboutTiles :data="boxes" />
    <SectionsHomeLeftImage :data="customized" />
    <SectionsHomeRightImage :data="quality" />
    <div class="lg:grid lg:grid-cols-2 lg:gap-10">
      <SectionsHomeInOffer :data="products" />
      <SectionsHomeAdditionalContent :data="{ information, yellow, welcome }" />
    </div>
    <SectionsCommonFindUs />
    <SectionsCommonUE />
  </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchHomePage } from '~/services/api';
import type { HomePage } from '~/types/home.types';

const localePath = useLocalePath();

const { data } = await useAsyncData(DataKeys.HOME_PAGE, () => fetchHomePage());
const { description } = toRefs(data.value as HomePage);
const { box: boxes, categories, collections, customized, information, products, quality, sliders: slides, welcome, yellow } = toRefs(reactive(description.value.content));
</script>