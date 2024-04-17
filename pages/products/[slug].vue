<template>
    <section>
        <div v-if="!productStore.product.isLoading">
            <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

            <div class="pb-10 w-full lg:flex lg:gap-10">
                <div class="relative lg:w-[45%] xl:w-[28%]">
                    <SectionsProductsBadge :badge="badge" />
                    <SectionsProductsMainImage :image="images.main" />
                    <SectionsProductsGallery />

                    <LazySectionsCommonLightbox :images="productStore.product.item.images.gallery" />
                </div>

                <div class="mt-6 lg:w-[55%] xl:w-[72%]">
                    <div class="xl:flex xl:gap-6">
                        <div>
                            <h1
                                class="text-[2rem] leading-[2.375rem] mt-0 mb-2 font-medium sm:text-[2.25rem] sm:leading-[2.75rem]">
                                {{ name }}</h1>
                            <p class="text-gray-3 font-medium uppercase text-xs mb-3">{{ category.name }}</p>
                        </div>
                        <SectionsProductsBox />
                    </div>
                    <SectionsProductsAttachments :images="images.details" />

                    <div class="flex flex-col gap-1 leading-4 sm:leading-6">
                        <SectionsProductsProductDescription :description="description" :doorsOpen="images.doors_open" />
                        <SectionsProductsProductTable :techImages="images.technical" :variants="variants" />
                        <SectionsProductsGlassTypes :glasses="images.glasses" />
                        <SectionsProductsDownloadFiles :files="files"/>
                    </div>
                </div>
            </div>

            <SectionsProductsSimilarProducts />
        </div>

        <SectionsCommonFindUs />
    </section>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchProductPage } from '~/services/api';
import type { ProductPage } from '~/types/products.types';

const productStore = useProductStore();
const openAccordionId = ref('product-description');
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);
const route = useRoute();

onMounted(async () => {
    await productStore.fetchProduct();
})

const { data } = await useAsyncData(DataKeys.PRODUCT_PAGE, () => fetchProductPage(route.params.slug));
const { badge, breadcrumbs, category, description, files, images, meta, name, similiarProducts, variants } = toRefs(data.value as ProductPage);

setMeta(meta.value);

provide('openAccordionId', openAccordionId);
provide('productStore', productStore);
provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);
</script>