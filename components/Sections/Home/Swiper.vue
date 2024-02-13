<template>
    <Swiper :navigation="sliderConfig.navigation" @slideChange="activeSlide = $event.realIndex"
        class="relative rounded-tr-lg" :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperNavigation]"
        :slides-per-view="sliderConfig.slidesPerView" :loop="sliderConfig.loop" :effect="sliderConfig.effect"
        :autoplay="sliderConfig.autoplay" :creative-effect="sliderConfig.creativeEffect">
        <SwiperSlide v-for="(slide, index) in homeStore.slider.items" :key="index">
            <NuxtLink :to="slide.url" class="relative" :aria-current-value="slide.title ?? `New Trendy - slide-${index}`">
                <div class="h-[582px] flex sm:h-[401px] lg:h-[612px] 2xl:h-[716px]">
                    <picture v-if="slide.type === 'image'" class="w-full">
                        <source media="(min-width:1024px)" :srcset="slide.fileUrls.lg">
                        <source media="(min-width:640px)" :srcset="slide.fileUrls.sm">
                        <NuxtImg preset="home-swiper" format="webp" :src="slide.fileUrls.base" class="h-full w-full object-cover" loading="lazy" :alt="slide.title ?? `New Trendy - slide-${index}`" :title="slide.title ?? `New Trendy - slide-${index}`" />
                    </picture>

                    <video muted loop webkit-playsinline playsinline autoplay v-if="slide.type === 'video'"
                        class="h-full w-full object-cover">
                        <source :src="slide.fileUrls.base" type="video/mp4">
                    </video>
                </div>

                <div class="absolute bottom-4 left-4 text-white md:bottom-1 lg:bottom-28 lg:left-6">
                    <p class="text-2xl">{{ slide.subtitle }}</p>
                    <h2 v-if="slide.title" class="text-[2.5rem] font-medium leading-[3rem] uppercase">{{ slide.title }}</h2>
                </div>
            </NuxtLink>
        </SwiperSlide>

        <div class="left-4 main-slider-arrow main-slider-arrow-prev lg:left-6">
            <img src="@/assets/icons/slider-arrow.svg" class="rotate-180" alt="">
        </div>

        <ul
            class="hidden absolute bottom-3 text-white z-20 left-1/2 -translate-x-1/2 w-[85%] border-t border-gray-1 pt-2 lg:flex">
            <li v-for="(slide, index) in homeStore.slider.items"
                :class="activeSlide === index ? 'before:flex after:flex main-slider-pagination-item-active' : 'before:hidden after:hidden'"
                class="
          flex-1 text-center uppercase text-sm relative main-slider-pagination-item
          before:absolute before:z-10 before:h-[3px] before:w-full before:bg-white before:-top-3
          after:-top-5 after:left-1/2 after:-translate-x-1/2 after:rotate-180 after:absolute after:z-10 after:border-l-[10px] after:border-r-[10px] after:border-t-[10px] after:border-[transparent] after:border-t-white 
        ">
                <span class="px-2">{{ slide.navTitle }}</span>
            </li>
        </ul>

        <div class="right-4 main-slider-arrow main-slider-arrow-next lg:right-6">
            <img src="@/assets/icons/slider-arrow.svg" alt="">
        </div>
    </Swiper>
</template>

<script setup>
const homeStore = useHomeStore();

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
};
</script>