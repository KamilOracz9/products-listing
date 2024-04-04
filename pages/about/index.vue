<template>
  <div>
    <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
    <section :id="slugify($t('companys-history'))">
      <p class="section-title">{{ $t('companys-history') }}</p>

      <div class="flex flex-col gap-6 pt-10 sm:gap-0 xl:flex-row xl:gap-10">
        <div class="section-text mt-0 xl:w-[50%]">
          <p data-aos="fade-up" v-html="description.content.section_1.html"></p>
          <ul class="pt-10">
            <li v-for="(item, index) in description.content.section_1.timeline" :key="index"
              class="flex [&:last-child>div]:border-l-0" data-aos="fade-up" :data-aos-delay="index * 100">
              <div class="w-[70px] -translate-y-[5px]">{{ item.date }}</div>
              <div
                class="timeline-description w-full pl-6 border-l border-black relative before:absolute before:top-0 before:bg-white before:rounded-full before:w-[13px] before:aspect-[1/1] before:border before:border-black before:left-0 before:-translate-x-1/2">
                <p class="-translate-y-[5px]">
                  {{ item.text }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="xl:w-[50%]">
          <div
            class="grid gap-6 [&>picture:first-child>img]:rounded-tl-[25px] [&>picture:last-child>img]:rounded-br-[25px] sm:grid-cols-2 lg:grid-cols-2 lg:gap-10">
            <picture v-for="(image, index) in description.content.section_1.images" :key="index" data-aos="fade-up">
              <source media="(min-width: 1280px)" :srcset="image.mobile">
              <source media="(min-width: 1024px)" :srcset="image.desktop">
              <img :src="image.mobile" alt="" class="h-full w-full object-cover">
            </picture>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-10" :id="slugify(description.content.section_2.title)">
      <p class="section-title" data-aos="fade-up">{{ description.content.section_2.title }}</p>
      <div class="section-text" data-aos="fade-up" v-html="description.content.section_2.html"></div>
      <div class="overflow-x-auto no-scrollbar">
        <div class="flex lg:justify-center">
          <img data-aos="fade-up" v-for="(image, index) in description.content.section_2.images" :key="index"
            loading="lazy" class="min-w-[216px] max-w-[216px] aspect-1/1 w-full h-full" width="216" height="216"
            :src="image.desktop" alt="">
        </div>
      </div>
    </section>

    <section class="xl:w-1/2" :id="slugify(description.content.section_3.title)">
      <p class="section-title" data-aos="fade-up">{{ description.content.section_3.title }}</p>
      <div class="section-text" data-aos="fade-up" v-html="description.content.section_3.html"></div>
    </section>

    <section class="mt-10" :id="slugify(description.content.section_4.title)">
      <p data-aos="fade-up" class="section-title">{{ description.content.section_4.title }}</p>
      <div class="grid xl:grid-cols-2 gap-6 section-text lg:gap-10">
        <div data-aos="fade-up" v-html="description.content.section_4.column_left.html"></div>
        <div data-aos="fade-up" v-html="description.content.section_4.column_right.html"></div>
      </div>
    </section>

    <SectionsCommonUE />
  </div>
</template>

<script setup lang="ts">
import { fetchAbout } from '~/services/api';
import { slugify } from '@/utils';

const { data } = await useAsyncData('about', () => fetchAbout());
const { description, meta, breadcrumbs } = toRefs(data.value);

setMeta(meta.value);
</script>