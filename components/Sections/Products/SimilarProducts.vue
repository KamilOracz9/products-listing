<template>
    <section>
        <h4 v-if="products.length" class="uppercase font-medium text-2xl mt-0 mb-2 sm:text-[1.625rem] sm:leading-8">{{
            $t('product.similar-products') }}</h4>

        <KeepAlive>
            <Swiper :navigation="sliderConfig.navigation" @slideChange="activeSlide = $event.realIndex" class="relative"
                :modules="[SwiperNavigation]" :slides-per-view="sliderConfig.slidesPerView" :loop="sliderConfig.loop"
                :effect="sliderConfig.effect" :autoplay="sliderConfig.autoplay"
                :creative-effect="sliderConfig.creativeEffect" :space-between="sliderConfig.spaceBetween"
                :breakpoints="sliderConfig.breakpoints">
                <SwiperSlide v-for="(slide, index) in products" :key="index">
                    <NuxtLink :to="localePath({ name: 'products' }) + `/${categorySlug}/${slide.slug}`" class="relative group"
                        :aria-label="slide.name">
                        <img :src="slide.images.mobile" alt="">
                        <div
                            class="absolute w-full h-full flex bg-[rgba(0,0,0,.5)] opacity-0 z-10 top-0 left-0 flex-col justify-end p-8 transition-opacity group-hover:opacity-[1]">
                            <p class="font-medium text-white uppercase leading-[120%] lg:text-[1.5rem]">{{ slide.name }}
                            </p>
                            <p class="uppercase text-white mt-1 flex gap-2 items-center lg:mt-4">
                                <!-- Zobacz -->
                                {{ $t('product.similar-product-see') }}
                                <Arrow :direction="'right'" class="white-filter" :width="12" />
                            </p>
                        </div>
                    </NuxtLink>
                </SwiperSlide>

                <div class="left-4 similar-products-slider-arrow similar-products-slider-arrow-prev lg:left-6">
                    <img src="@/assets/icons/slider-arrow.svg" class="rotate-180" alt="">
                </div>

                <div class="right-4 similar-products-slider-arrow similar-products-slider-arrow-next lg:right-6">
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
    categorySlug: string;
}>();

const activeSlide = ref(0);

const { products, categorySlug } = toRefs(props);

const sliderConfig = {
    'slidesPerView': 1,
    'loop': true,
    navigation: {
        nextEl: '.similar-products-slider-arrow-next',
        prevEl: '.similar-products-slider-arrow-prev',
    },
    spaceBetween: 20,
    breakpoints: {
        450: { slidesPerView: 2 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1280: { slidesPerView: 4, spaceBetween: 40 },
    }
};
</script>