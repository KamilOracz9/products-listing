<template>
    <section>
        <h4 v-if="products.length" class="uppercase font-medium text-2xl mt-0 mb-2 sm:text-[1.625rem] sm:leading-8">{{ title }}</h4>

        <KeepAlive>
            <Swiper 
                :navigation="sliderConfig.navigation"
                @slideChange="activeSlide = $event.realIndex"
                class="relative"
                :modules="swiperModules"
                :slides-per-view="sliderConfig.slidesPerView"
                :loop="sliderConfig.loop"
                :autoplay="sliderConfig.autoplay"
                :space-between="sliderConfig.spaceBetween"
                :breakpoints="sliderConfig.breakpoints"
            >
                <SwiperSlide v-for="(slide, index) in products" :key="index">
                    <NuxtLink :to="localePath({ name: 'product-slug', params: { slug: slide.slug } })"
                        class="relative block group" :aria-label="slide.name">
                        <img :src="slide.images.mobile" alt="">
                        <div
                            style="container-type: inline-size;"
                            class="container full grid justify-end mt-4 h-full">
                            <p class="font-medium uppercase text-[7cqi] line-clamp-[2] leading-[10cqi]">{{ slide.name }}
                            </p>
                            <p class="uppercase mt-2 flex gap-2 items-center text-white bg-black w-fit px-2 py-[.125rem] rounded-br-xs group-hover:bg-yellow-1 transition-all">
                                {{ $t('product.similar-product-see') }}
                                <Arrow :direction="'right'" class="white-filter" :width="12" />
                            </p>
                        </div>
                    </NuxtLink>
                </SwiperSlide>

                <div :class="['left-4', 'similar-products-slider-arrow', prevButtonClass, '-translate-y-[120%]', 'lg:-translate-y-[65%]', 'lg:left-6']">
                    <img src="@/assets/icons/slider-arrow.svg" class="rotate-180" alt="">
                </div>

                <div :class="['right-4', 'similar-products-slider-arrow', nextButtonClass, '-translate-y-[120%]', 'lg:-translate-y-[65%]', 'lg:right-6']">
                    <img src="@/assets/icons/slider-arrow.svg" alt="">
                </div>
            </Swiper>
        </KeepAlive>
    </section>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';

const localePath = useLocalePath();

const props = defineProps<{
    products: {
        images: IPhoto;
        name: string;
        slug: string;
    }[];
    title: string;
    sliderConfig: {
        slidesPerView: number,
        autoplay: boolean,
        loop: boolean,
        navigation: {
            nextEl: string,
            prevEl: string,
        },
        spaceBetween: number,
        breakpoints: {[key: number]: {[key: string]: number}}
    };
    prevButtonClass?: string;
    nextButtonClass?: string;
}>();

const swiperModules = [SwiperNavigation];

const activeSlide = ref(0);

const { products } = toRefs(props);
const { prevButtonClass, nextButtonClass } = toRefs(props);
</script>