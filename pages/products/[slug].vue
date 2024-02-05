<template>
    <section>
        <div v-if="!productStore.product.isLoading">
            <SectionsCommonBreadrumbs :breadcrumbs="productStore.product.item.breadcrumbs" />

            <div class="pb-10 w-full lg:flex lg:gap-10">
                <div class="relative lg:w-[45%] xl:w-[28%]">
                    <SectionsProductsBadge :badge="productStore.product.item.badge" />
                    <SectionsProductsMainImage />
                    <SectionsProductsGallery />
                    <!-- <SectionsCommonModal>
                        <template #content>
                            <SectionsProductsGalleryModal :images="productStore.product.item.images.gallery" />
                        </template>
                        <template #navigation>
                            <SectionsProductsModalNavigation />
                        </template>
                    </SectionsCommonModal> -->

                    <LazySectionsCommonLightbox :images="productStore.product.item.images.gallery" />
                </div>

                <div class="mt-6 lg:w-[55%] xl:w-[72%]">
                    <h1>{{ productStore.product.item.name }}</h1>
                    <p class="text-gray-3 font-medium uppercase text-xs mb-3">{{ productStore.product.item.category.name }}
                    </p>
                    <SectionsProductsBox />
                    <SectionsProductsAttachments />

                    <div class="flex flex-col gap-1 leading-4 sm:leading-6">
                        <SectionsProductsProductDescription />
                        <SectionsProductsProductTable />
                        <SectionsProductsGlassTypes />
                        <SectionsProductsDownloadFiles />
                    </div>
                </div>
            </div>

            <SectionsProductsSimilarProducts />
        </div>

        <SectionsCommonFindUs />
    </section>
</template>

<script setup>
const productStore = useProductStore();
const openAccordionId = ref('product-description');
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);

provide('openAccordionId', openAccordionId);
provide('productStore', productStore);
provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

onMounted(async () => {
    await productStore.fetchProduct();
})
</script>