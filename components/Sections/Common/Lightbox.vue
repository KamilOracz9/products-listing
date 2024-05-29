<template>
    <VueEasyLightbox class="lightbox" :visible="visibleRef" :imgs="imgsRef" :index="indexRef" @on-index-change="index => onChangeIndex(index)"
        @hide="close" :zoom-scale="0.5" :loop="true">
        <template v-if="images.length > 1" v-slot:prev-btn="{ prev }">
            <div @click="prev" class="left-4 modal-slider-arrow modal-slider-arrow-prev lg:left-6">
                <Arrow :width="25" :height="25" class="rotate-90" />
            </div>
        </template>

        <template v-if="images.length > 1" v-slot:next-btn="{ next }">
            <div @click="next" class="right-4 modal-slider-arrow modal-slider-arrow-next lg:right-6">
                <Arrow :direction="'right'" :width="25" :height="25" />
            </div>
        </template>

        <template #toolbar>
            <div class="p-6 flex items-center">
                <p v-if="images.length > 1" class="text-lg">{{ activeIndex + 1 }} / {{ images.length }}</p>
                <img src="@/assets/icons/close.svg" loading="lazy" class="w-[25px] ml-auto cursor-pointer" alt="" @click="close">
            </div>
        </template>
    </VueEasyLightbox>
</template>

<script setup>
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox'

const props = defineProps(['images']);
const modalIsOpen = inject('modalIsOpen');
const galleryActiveSlide = inject('galleryActiveSlide');
const activeIndex = ref(0);

const { images } = props;

const {
    show, onHide, changeIndex,
    visibleRef, indexRef, imgsRef
} = useEasyLightbox({
    imgs: images.map(image => image?.full),
    initIndex: galleryActiveSlide,
})

const close = () => {
    onHide();
    modalIsOpen.value = false;
}

const onChangeIndex = (index) => {
    changeIndex();
    activeIndex.value = index;
}

watch(modalIsOpen, value => {
    if (value) show();
})
</script>