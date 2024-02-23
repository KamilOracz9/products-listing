<template>
    <section :id="slugify($t('companys-history'))">
        <p class="section-title">{{ $t('companys-history') }}</p>

        <div class="flex flex-col gap-6 pt-10 sm:gap-0 xl:flex-row xl:gap-10">
            <div class="section-text mt-0 xl:w-[50%]">
                <p v-html="story?.body"></p>
                <ul class="pt-10">
                    <li v-for="(item, index) in story?.list" :key="index" class="flex [&:last-child>div]:border-l-0">
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
                    <picture v-for="(image, index) in story.images" :key="index">
                        <source media="(min-width: 1280px)" :srcset="image.mobile">
                        <source media="(min-width: 1024px)" :srcset="image.desktop">
                        <img :src="image.mobile" alt="" class="h-full w-full object-cover">
                    </picture>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import slugify from '~/plugins/slugify';

const aboutStore = inject('aboutStore');
const { story } = aboutStore;
</script>