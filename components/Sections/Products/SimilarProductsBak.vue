<template>
    <div ref="containerRef" id="slider-container"
        class="grid relative gap-10 mb-10 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <NuxtLink v-for="(product, index) in products" :data-slide-index="index"
            :to="localePath({ name: 'products' }) + `/${product.slug}`" class="relative group slider-slide"
            :aria-label="product.name">
            <img :src="product.images.mobile" alt="" />
            <div
                class="absolute w-full h-full flex bg-[rgba(0,0,0,.5)] opacity-0 z-10 top-0 left-0 flex-col justify-end p-8 transition-opacity group-hover:opacity-[1]">
                <p class="font-medium text-white uppercase leading-[120%] lg:text-[1.5rem]">{{ product.name }}</p>
                <p class="uppercase text-white mt-1 flex gap-2 items-center lg:mt-4">Zobacz
                    <Arrow :direction="'right'" class="white-filter" :width="12" />
                </p>
            </div>
        </NuxtLink>

        <div ref="prevBtnRef" class="left-4 similar-products-slider-arrow similar-products-slider-arrow-prev lg:left-6">
            <img src="@/assets/icons/slider-arrow.svg" class="rotate-180" alt="">
        </div>

        <div ref="nextBtnRef"
            class="right-4 similar-products-slider-arrow similar-products-slider-arrow-next lg:right-6">
            <img src="@/assets/icons/slider-arrow.svg" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IPhoto } from '~/types';

type Breakpoints = {
    [key: string]: number,
}

type Product = {
    images: IPhoto;
    name: string;
    slug: string;
    type: string;
}

const SLIDE_SELECTOR = '.slider-slide';

const breakpoints: Breakpoints = {
    '0': 1,
    '450': 2,
    '640': 3,
    '768': 4,
}

const localePath = useLocalePath();

const props = defineProps<{
    products: Product[];
}>();

const products = toRef([...props.products]);

const containerRef = ref();
const prevBtnRef = ref();
const nextBtnRef = ref();

const slides = ref();

const useSlider = () => {
    const breakpointKey = Object.keys(breakpoints).filter(breakpoint => parseInt(breakpoint) <= window.innerWidth).reverse()[0];
    const breakpoint = breakpoints[breakpointKey as keyof Breakpoints];

    toValue(prevBtnRef).dataset.hidden = toValue(slides).length <= breakpoint;
    toValue(nextBtnRef).dataset.hidden = toValue(slides).length <= breakpoint;
}

const nextSlide = () => {
    products.value.push(products.value.shift() as Product);
}

const prevSlide = () => {
    products.value.unshift(products.value.pop() as Product);
}

onMounted(() => {
    slides.value = [...toValue(containerRef).querySelectorAll(SLIDE_SELECTOR)];

    useSlider();

    window.addEventListener('resize', useSlider);
    toValue(nextBtnRef).addEventListener('click', nextSlide);
    toValue(prevBtnRef).addEventListener('click', prevSlide);
})

onUnmounted(() => {
    window.removeEventListener('resize', useSlider);
    toValue(nextBtnRef)?.removeEventListener('click', nextSlide);
    toValue(prevBtnRef)?.removeEventListener('click', prevSlide);
})

</script>

<style>
#slider-container .slider-slide {
    display: none;
}

#slider-container .slider-slide:nth-child(1) {
    display: block;
}

#slider-container div[data-hidden="true"] {
    display: none;
}

@media(min-width: 450px) {
    #slider-container .slider-slide:nth-child(2) {
        display: block;
    }
}

@media(min-width: 640px) {
    #slider-container .slider-slide:nth-child(3) {
        display: block;
    }
}

@media(min-width: 768px) {
    #slider-container .slider-slide:nth-child(4) {
        display: block;
    }
}
</style>