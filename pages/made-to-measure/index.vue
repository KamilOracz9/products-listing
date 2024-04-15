<template>
    <div id="made-to-measure" class="[&_a]:border-black [&_a]:xs:w-fit [&_a]:h-fit">
        <Breadrumbs :breadcrumbs="breadcrumbs" />

        <h1 class="section-title">{{ title }}</h1>

        <div class="content-grid">
            <div class="row">
                <div class="column">
                    <h2>{{ section_1.title }}</h2>
                    <div v-html="section_1.html.top" />
                    <img :src="section_1.images.svg" width="500" height="152" class="aspect-[auto_500/152] mx-auto"
                        alt="">
                    <div v-html="section_1.html.bottom" />
                    <ButtonsTransparent v-for="button in section_1.buttons" tag-type="link" :label="button.button"
                        :url="button.link" />
                </div>
                <img :src="section_1.images.right"
                    class="column rounded-tr-lg md:max-h-[400px] lg:max-h-full lg:h-full w-full object-cover" alt="">
            </div>

            <div class="row">
                <div class="column">
                    <p class="![font-size:_clamp(1.25rem,2cqw,1.625rem)] leading-[1.1] font-extrabold">{{
                        section_2.title }}</p>
                    <p class="![font-size:_clamp(1.25rem,2cqw,1.5rem)] text-yellow-1 mt-4 leading-[1.1] font-medium">{{
                        section_2.subtitle }}</p>
                </div>
            </div>

            <div class="row instruction divider">
                <div class="column" v-for="(item, index) in section_2.items" :data-aos-delay="index * 100">
                    <img loading="lazy" width="80" height="80" :src="item.icon" alt="">
                    <h3>{{ item.title }}</h3>
                    <span v-html="item.html" />
                </div>
            </div>

            <div id="menu" class="row menu divider">
                <div class="column">
                    <h2>{{ section_3.title }}</h2>
                    <h3 v-for="(item, index) in section_3.items" :data-aos-delay="index * 100">
                        <NuxtLink :aria-label="item.label" :to="item.hashtag" class=""><img loading="lazy"
                                :src="plusIcon" width="20" height="20" alt="">{{ item.label }}</NuxtLink>
                    </h3>
                </div>
            </div>

            <SectionsMadeToMeasureModification :data="section_4">
                <div class="section-img"><img loading="lazy" width="1000" height="667" :src="section_4.image" alt=""
                        class="rounded-bl-md md:rounded-bl-lg"></div>
            </SectionsMadeToMeasureModification>

            <SectionsMadeToMeasureModification imgClass="rounded-bl-md md:rounded-bl-lg" :data="section_5">
                <div class="row col-span-2">
                    <div class="section-img"><img loading="lazy" width="1000" height="667"
                            :src="section_5.images[0].left" alt="" class="rounded-tl-md md:rounded-tl-lg"></div>
                    <div class="section-img"><img loading="lazy" width="1000" height="667"
                            :src="section_5.images[0].right" alt="" class="rounded-br-md md:rounded-br-lg"></div>
                </div>

                <div class="row tech-pictures col-span-2">
                    <div class="flex items-center justify-center" v-for="(image, index) in section_5.images[0].bottom">
                        <img loading="lazy" :data-aos-delay="index * 100" :src="image" alt="" class="column" width="205"
                            height="205" />
                    </div>
                </div>
            </SectionsMadeToMeasureModification>

            <SectionsMadeToMeasureModification :data="section_6">
                <div class="section-img"><img loading="lazy" width="1000" height="667" :src="section_6.image" alt=""
                        class="rounded-tl-md md:rounded-tl-lg"></div>
            </SectionsMadeToMeasureModification>

            <SectionsMadeToMeasureModification :data="section_7">
                <div class="section-img"><img loading="lazy" width="1000" height="667" :src="section_7.image" alt="">
                </div>
            </SectionsMadeToMeasureModification>

            <SectionsMadeToMeasureModification :data="section_8">
                <div class="section-img"><img loading="lazy" width="1000" height="667" :src="section_8.image" alt=""
                        class="rounded-br-md md:rounded-br-lg"></div>
            </SectionsMadeToMeasureModification>

            <SectionsMadeToMeasureModification :data="section_9">
                <div class="section-img"><img loading="lazy" width="1000" height="667" :src="section_9.image" alt="">
                </div>
            </SectionsMadeToMeasureModification>

            <SectionsMadeToMeasureModification :data="section_10">
                <div class="row glasses mb-10 col-span-2">
                    <div class="column" v-for="(item, index) in section_10.items">
                        <img loading="lazy" :src="item.image" alt="">
                        <p>{{ item.text }}</p>
                        <table class="mt-auto">
                            <thead>
                                <th v-for="row in Object.values(item.table[0].thead[0])">{{ row }}</th>
                            </thead>
                            <tbody>
                                <tr v-for="row in Object.values(item.table[0].tbody)">
                                    <td>{{ row.symbol }}</td>
                                    <td>{{ row.glass }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="flex justify-between">
                            <p class="uppercase font-medium">{{ $t('pages.made-to-measure.transparency-level') }}</p>
                            <div class="flex gap-1 items-center stars">
                                <img loading="lazy" v-for="index in Math.floor(parseInt(item.level_transparency))"
                                    src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png"
                                    width="20" height="20" alt="">
                                <img loading="lazy" v-if="parseFloat(item.level_transparency) % 1"
                                    src="http://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_50na50-1.png"
                                    width="20" height="20" alt="">
                                <img loading="lazy"
                                    v-for="index in (5 - parseInt(item.level_transparency) - Math.ceil((parseFloat(item.level_transparency) % 1)))"
                                    src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_szara-1.png"
                                    width="20" height="20" alt="">
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <p class="uppercase font-medium ![font-size:_clamp(.75rem,1cqw,1rem)]">{{
                                $t('pages.made-to-measure.discretion-level') }}</p>
                            <div class="flex gap-1 items-center stars">
                                <img loading="lazy" v-for="index in Math.floor(parseInt(item.level_discretion))"
                                    src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png"
                                    width="20" height="20" alt="">
                                <img loading="lazy" v-if="parseFloat(item.level_discretion) % 1"
                                    src="http://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_50na50-1.png"
                                    width="20" height="20" alt="">
                                <img loading="lazy"
                                    v-for="index in (5 - parseInt(item.level_discretion) - Math.ceil((parseFloat(item.level_discretion) % 1)))"
                                    src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_szara-1.png"
                                    width="20" height="20" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </SectionsMadeToMeasureModification>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadrumbs from '~/components/Sections/Common/Breadrumbs.vue';
import { fetchMadeToMeasure } from '~/services/api';
import type { MadeToMeasurePage } from '~/types/made-to-measure.types';

const plusIcon = 'https://newtrendy.pl/app/uploads/2023/07/krzyzyk.jpg';

const { data } = await useAsyncData('made-to-measure', () => fetchMadeToMeasure());
const { breadcrumbs, description, meta, title } = toRefs(data.value as MadeToMeasurePage);
const { section_1, section_2, section_3, section_4, section_5, section_6, section_7, section_8, section_9, section_10 } = toRefs(description.value.content);

setMeta(meta.value);
</script>