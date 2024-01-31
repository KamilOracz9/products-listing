<template>
    <section>
        <h4 class="uppercase">{{ $t('product.similiar-products') }}</h4>

        <Swiper :navigation="sliderConfig.navigation" @slideChange="activeSlide = $event.realIndex" class="relative"
            :modules="[SwiperNavigation]" :slides-per-view="sliderConfig.slidesPerView" :loop="sliderConfig.loop"
            :effect="sliderConfig.effect" :autoplay="sliderConfig.autoplay" :creative-effect="sliderConfig.creativeEffect"
            :space-between="sliderConfig.spaceBetween" :breakpoints="sliderConfig.breakpoints">
            <SwiperSlide v-for="(slide, index) in productStore.product.item.similiarProducts" :key="index">
                <NuxtLink :to="localePath({ name: 'products' }) + `/${slide.slug}`" class="relative group">
                    <img :src="slide.image" alt="">
                    <div class="absolute w-full h-full flex bg-[rgba(0,0,0,.5)] opacity-0 z-10 top-0 left-0 flex-col justify-end p-8 transition-opacity group-hover:opacity-[1]">
                        <p class="font-medium text-white uppercase leading-[120%] lg:text-[1.5rem]">{{ slide.name }}</p>
                        <p class="uppercase text-white mt-1 flex gap-2 items-center lg:mt-4">Zobacz <img src="@/assets/icons/arrow.svg" class="-translate-y-[1px] -rotate-90 white-filter h-[12px]" alt=""></p>
                    </div>
                </NuxtLink>
            </SwiperSlide>

            <div class="left-4 similiar-products-slider-arrow similiar-products-slider-arrow-prev lg:left-6">
                <img src="@/assets/icons/slider-arrow.svg" class="rotate-180" alt="">
            </div>

            <div class="right-4 similiar-products-slider-arrow similiar-products-slider-arrow-next lg:right-6">
                <img src="@/assets/icons/slider-arrow.svg" alt="">
            </div>
        </Swiper>
    </section>
</template>

<script setup>
const productStore = inject('productStore');
const localePath = useLocalePath();

const sliderConfig = {
    'slidesPerView': 1,
    'loop': false,
    navigation: {
        nextEl: '.similiar-products-slider-arrow-prev',
        prevEl: '.similiar-products-slider-arrow-next',
    },
    spaceBetween: 20,
    breakpoints: { 
        450: { slidesPerView: 2 }, 
        768: { slidesPerView: 3, },
        1280: { slidesPerView: 4, }, 
    }
};
</script>