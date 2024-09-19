<template>
    <section>
        <div v-if="!pending">
            <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

            <div class="pb-10 w-full lg:flex lg:gap-10">
                <div class="relative lg:w-[45%] xl:w-[28%]">
                    <SectionsProductsBadge :badge="badge" />
                    <SectionsProductsMainImage :image="images.main" />
                    <!-- <SectionsProductsGallery /> -->

                    <SectionsCommonLightbox :images="Object.values(images)" />
                </div>

                <div class="mt-6 lg:w-[55%] xl:w-[72%]">
                    <div class="xl:flex xl:gap-6">
                        <div>
                            <h1
                                class="text-[2rem] leading-[2.375rem] mt-0 mb-2 font-medium sm:text-[2.25rem] sm:leading-[2.75rem]">
                                {{ name }}</h1>
                            <p class="text-gray-3 font-medium uppercase text-xs mb-3">{{ category?.name }}</p>
                        </div>
                        <SectionsProductsBox v-if="data.enabled_on_dimension" />
                    </div>
                    <SectionsProductsAttachments :images="images.details" />

                    <div class="flex flex-col gap-1 leading-4 sm:leading-6">
                        <SectionsProductsProductDescription :video="data.video" :description="description"
                            :attributes="images.attribute_icons" :doorsOpen="images.description_icons"
                            :colors="data.other_colors" />
                        <SectionsProductsProductTable :techImages="[...images.technical, ...images.technical_desc]"
                            :productId="data.id" :variants="variants" />
                        <SectionsProductsGlassTypes v-if="hasGlasses" :glasses="images.glasses" />
                        <SectionsProductsDownloadFiles v-if="hasFiles" :files="files" />
                    </div>
                </div>
            </div>
            <SectionsProductsSimilarProducts :products="data.relationships.similar ?? []" />
        </div>

        <LoadingIndicator v-if="pending" />

        <SectionsCommonFindUs />
    </section>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import fetchData, { fetchProductPage } from '~/services/api';
import type { ProductPage } from '~/types/products.types';

const openAccordionId = ref('product-description');
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);
const route = useRoute();
const localeRoute = useLocaleRoute();
const { locale } = useI18n();

const linkPath = computed(() => {
    const route = localeRoute('products', locale.value)
    return route != null ? route.path : '/'
})

const { data, pending } = await fetchData(DataKeys.PRODUCT_PAGE, async () => fetchProductPage(route.params.slug));
const { badge, breadcrumbs, category, description, files, images, meta, name, variants } = toRefs(data.value as ProductPage);

const hasFiles = computed(() => !!Object.values(files.value).filter(file => file).length);
const hasGlasses = computed(() => !!images.value.glasses.length);

setMeta(meta.value);

provide('openAccordionId', openAccordionId);
provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);

onMounted(() => {
    // window.history.replaceState({}, '', linkPath.value + `/${category.value.slug}/${data.value.slug}`);
})
</script>