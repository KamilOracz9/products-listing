<template>
    <div>
        <Swiper v-if="data" :navigation="sliderConfig.navigation" :pagination="sliderConfig.pagination"
            @slideChange="activeSlide = $event.realIndex" class="relative rounded-tr-lg"
            :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]" :slides-per-view="sliderConfig.slidesPerView"
            :loop="sliderConfig.loop" :effect="sliderConfig.effect" :autoplay="sliderConfig.autoplay"
            :creative-effect="sliderConfig.creativeEffect">
            <SwiperSlide v-for="(slide, index) in data" :key="index">
                <NuxtLink :to="slide.path" class="relative" :aria-label="slide.title ?? `New Trendy - slide-${index}`"
                    :key="index" :aria-current-value="slide.title ?? `New Trendy - slide-${index}`">
                    <div
                        class="h-[582px] flex relative after:w-full after:h-full after:absolute after:bg-[linear-gradient(90deg,_rgba(29,29,27,0.4)_0%,_rgba(29,29,27,0)_40%,_rgba(29,29,27,0)_100%)] sm:h-[401px] lg:h-[612px] 2xl:h-[716px]">

                        <img v-if="slide.image" decoding="async" :src="slide.image?.mobile" :srcset="`
                                ${slide.image?.mobile} 607w,
                                                        ${slide.image?.tablet} 991w,
                                                        ${slide.image?.desktop} 1680w,
                            `" :alt="slide.title ?? `New Trendy - slide-${index}`"
                            :title="slide.title ?? `New Trendy - slide-${index}`" class="h-full w-full object-cover" />

                        <ClientOnly>
                            <video muted loop webkit-playsinline playsinline autoplay v-if="slide.video"
                                class="h-full w-full object-cover">
                                <source :src="slide.video.full" type="video/mp4">
                            </video>
                        </ClientOnly>
                    </div>

                    <div class="absolute bottom-4 left-4 text-white md:bottom-1 lg:bottom-32 lg:left-20">
                        <p class="text-3xl">{{ slide.subtitle }}</p>
                        <p v-if="slide.title"
                            class="text-[2.5rem] font-medium leading-[3rem] uppercase xl:text-[50px] xl:leading-[60px]">
                            {{ slide.title }}
                        </p>
                    </div>
                </NuxtLink>
            </SwiperSlide>

            <img src="@/assets/icons/slider-arrow.svg"
                class="left-4 main-slider-arrow main-slider-arrow-prev block rotate-180 lg:left-14 xl:left-16 2xl:left-20"
                :alt="$t('slider-arrow-left')" :title="$t('slider-arrow-left')">

            <div
                class="swiper-pagination hidden absolute bottom-3 text-white z-20 !left-1/2 !-translate-x-1/2 !w-[80%] border-t border-white pt-2 lg:flex lg:text-base lg:!bottom-7 xl:!w-[85%]">
            </div>

            <img class="right-4 main-slider-arrow main-slider-arrow-next block lg:right-14 xl:right-16 2xl:right-20"
                src="@/assets/icons/slider-arrow.svg" :alt="$t('slider-arrow-left')" :title="$t('slider-arrow-left')">
        </Swiper>
    </div>
</template>

<script setup lang="ts">
import type { Slide } from '~/types/home.types';

const props = defineProps<{
    data: Slide[];
}>();

const { data } = toRefs(props);

const activeSlide = ref(0);

const sliderConfig = {
    'slidesPerView': 1,
    'loop': true,
    'effect': 'creative',
    'autoplay': {
        delay: 10000,
        disableOnInteraction: true,
    },
    'creativeEffect': {
        prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
        },
        next: {
            translate: ['100%', 0, 0],
        },
    },
    navigation: {
        nextEl: '.main-slider-arrow-next',
        prevEl: '.main-slider-arrow-prev',
    },
    pagination: {
        clickable: true,
        el: '.swiper-pagination',
        renderBullet: function (index: number, className: string) {
            return `<span class="${className}">${data.value[index]?.tab ?? ''}</span>`;
        },
    }
};
</script>

<style scoped>
.swiper-pagination-bullet-active {
    background: #fff;
}
</style>