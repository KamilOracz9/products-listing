<template>
    <section v-if="data && !pending">
        <div class="mb-12">
            <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />

            <div class="pb-10 w-full lg:flex lg:gap-10">
                <div class="relative lg:w-[45%] xl:w-[28%]">
                    <SectionsProductsBadge :badge="badge" />
                    <SectionsProductsMainImage :image="images.main" />

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
                        <SectionsProductsProductTable v-if="variants"
                            :techImages="[...images.technical, ...images.technical_desc]" :productId="data.id"
                            :variants="variants" />
                        <SectionsProductsGlassTypes v-if="hasGlasses" :glasses="images.glasses" />
                        <SectionsProductsDownloadFiles v-if="hasFiles" :files="files" />
                    </div>
                </div>
            </div>
            <div :class="hasAllRelationships && 'flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-20 xl:gap-28'">
                <ProductsSlider :sliderConfig="sliderConfig" :products="data.relationships.complementary ?? []"
                    :title="$t('product.complementary-products')" />
                <ProductsSlider :sliderConfig="sliderConfig" :products="data.relationships.similar ?? []"
                    :title="$t('product.similar-products')" />
            </div>
        </div>

        <SectionsCommonFindUs />
    </section>
</template>

<script setup lang="ts">
import ProductsSlider from '~/components/Sections/Products/ProductsSlider.vue';
import { DataKeys } from '~/enums/dataKeys';
import fetchData, { fetchProductPage } from '~/services/api';
import type { ProductPage } from '~/types/products.types';

const openAccordionId = ref('product-description');
const modalIsOpen = ref(false);
const galleryActiveSlide = ref(0);
const route = useRoute();

const { data, pending } = await fetchData(DataKeys.PRODUCT_PAGE, async () => fetchProductPage(route.params.slug, getLocaleIso()));
const { badge, breadcrumbs, category, description, files, images, meta, name, variants, schema } = toRefs(data.value as ProductPage);

const hasFiles = computed(() => !!Object.values(files.value).filter(file => file).length);
const hasGlasses = computed(() => !!images.value.glasses.length);
const hasAllRelationships = computed(() => !!(data.value.relationships.similar.length && data.value.relationships.complementary.length))

const sliderConfig = computed(() => (
    {
        'slidesPerView': 1,
        autoplay: false,
        loop: true,
        navigation: {
            nextEl: '.similar-products-slider-arrow-next',
            prevEl: '.similar-products-slider-arrow-prev',
        },
        spaceBetween: 20,
        breakpoints: hasAllRelationships.value ? {
            450: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 2, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 40 },
        } : {
            450: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 40 },
        }
    }
));

if(meta) setMeta(meta.value);

if(schema) useSchemaOrg([
    schema.value
])

provide('openAccordionId', openAccordionId);
provide('modalIsOpen', modalIsOpen);
provide('galleryActiveSlide', galleryActiveSlide);
</script>