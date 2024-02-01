<template>
    <SectionsProductsModalHeader :count="galleryActiveSlide" :countBy="images.length" />
    <div id="gallery-modal" class="w-[calc(100%-120px)] h-full relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Swiper :navigation="sliderConfig.navigation" @slideChange="galleryActiveSlide = $event.realIndex" :initial-slide="sliderConfig.initialSlide"
            class="relative w-full h-full" :modules="[SwiperNavigation]" :slides-per-view="sliderConfig.slidesPerView"
            :loop="sliderConfig.loop" :effect="sliderConfig.effect" :autoplay="sliderConfig.autoplay"
            :creative-effect="sliderConfig.creativeEffect" :space-between="sliderConfig.spaceBetween"
            :breakpoints="sliderConfig.breakpoints">
            <SwiperSlide v-for="(image, index) in images" :key="index" class="relative overlay">
                <div class="h-[calc(100%-160px)] w-full relative left-1/2 -translate-x-1/2 lg:w-fit">
                    <img :src="image.full" alt="" class="h-full top-0 left-1/2 -translate-x-1/2 relative object-contain">
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
const galleryActiveSlide = inject('galleryActiveSlide');
const { images } = defineProps(['images']);

const sliderConfig = {
    initialSlide: galleryActiveSlide.value,
    'slidesPerView': 1,
    'loop': true,
    navigation: {
        nextEl: '.modal-slider-arrow-next',
        prevEl: '.modal-slider-arrow-prev',
    },
};
</script>