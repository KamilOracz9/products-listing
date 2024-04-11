<template>
    <Swiper :navigation="sliderConfig.navigation" :pagination="sliderConfig.pagination"
        @slideChange="activeSlide = $event.realIndex" class="relative rounded-tr-lg"
        :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation, SwiperPagination]"
        :slides-per-view="sliderConfig.slidesPerView" :loop="sliderConfig.loop" :effect="sliderConfig.effect"
        :autoplay="sliderConfig.autoplay" :creative-effect="sliderConfig.creativeEffect">
        <SwiperSlide v-for="(slide, index) in data" :key="index">
            <NuxtLink :to="slide.path" class="relative"
                :aria-current-value="slide.title ?? `New Trendy - slide-${index}`">
                <div class="h-[582px] flex sm:h-[401px] lg:h-[612px] 2xl:h-[716px]">
                    <!-- <picture v-if="slide.image" class="w-full">
                        <source media="(min-width:1024px)" :srcset="slide.fileUrls.lg">
                        <source media="(min-width:640px)" :srcset="slide.fileUrls.sm">
                        <img preset="home-swiper" :src="slide.fileUrls.base" class="h-full w-full object-cover"
                            :alt="slide.title ?? `New Trendy - slide-${index}`"
                            :title="slide.title ?? `New Trendy - slide-${index}`" />
                    </picture> -->
                    <img preset="home-swiper" :src="slide.image" class="h-full w-full object-cover"
                        :alt="slide.title ?? `New Trendy - slide-${index}`"
                        :title="slide.title ?? `New Trendy - slide-${index}`" />

                    <video muted loop webkit-playsinline playsinline autoplay v-if="slide.video"
                        class="h-full w-full object-cover">
                        <source :src="slide.video" type="video/mp4">
                    </video>
                </div>

                <div class="absolute bottom-4 left-4 text-white md:bottom-1 lg:bottom-36 lg:left-12">
                    <p class="text-2xl">{{ slide.subtitle }}</p>
                    <h2 v-if="slide.title" class="text-[2.5rem] font-medium leading-[3rem] uppercase">{{ slide.title }}
                    </h2>
                </div>
            </NuxtLink>
        </SwiperSlide>

        <img src="@/assets/icons/slider-arrow.svg"
            class="left-4 main-slider-arrow main-slider-arrow-prev block rotate-180 lg:left-14 xl:left-16 2xl:left-20"
            alt="">

        <div
            class="swiper-pagination hidden absolute bottom-3 text-white z-20 !left-1/2 !-translate-x-1/2 !w-[80%] border-t border-gray-1 pt-2 lg:flex lg:text-lg lg:!bottom-9 xl:!w-[85%]">
        </div>

        <img class="right-4 main-slider-arrow main-slider-arrow-next block lg:right-14 xl:right-16 2xl:right-20"
            src="@/assets/icons/slider-arrow.svg" alt="">
    </Swiper>
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
            return `<span class="${className}">${data.value[index].tab ?? ''}</span>`;
        },
    }
};

</script>

<style scoped>
.swiper-pagination-bullet-active {
    background: #fff;
}
</style>