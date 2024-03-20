<template>
    <section>
        <SectionsCommonBreadrumbs v-if="breadcrumbs && breadcrumbs.length" :breadcrumbs="breadcrumbs" />

        <h1
            class="uppercase text-[2rem] leading-[2.375rem] mt-0 mb-2 font-medium sm:text-[2.25rem] sm:leading-[2.75rem]">
            {{ title }}</h1>

        <div class="mt-10 flex gap-10">
            <SectionsProductsSidebar />
            <div class="w-full lg:w-3/4 xl:w-full">
                <p v-if="shortText" class="pb-3.5 mb-5 border-b text-lg" v-html="shortText"></p>

                <SectionsProductsCategories />

                <button @click="productsFilterStore.toggleMenuIsOpen" class="my-10 underline text-2xl lg:hidden">{{
            $t('filtering') }} / {{ $t('sorting') }}</button>

                <SectionsProductsListing :products="data.data" />
                <!-- <SectionsProductsListing v-if="!productStore.list.isLoading" /> -->
                <SectionsProductsPagination v-if="data.meta.last_page > 1" :meta="data.meta" />

                <p v-if="longText"
                    class="pt-3.5 mb-5 border-t text-lg [&_ul]:list-disc [&_ul]:px-5 [&_h2]:text-[1.75rem] [&_h2]:font-medium [&_h3]:text-[1.5rem] [&_h3]:font-medium"
                    v-html="longText"></p>
            </div>
        </div>

        <div>
            <slot />
        </div>

        <SectionsCommonFindUs />
    </section>
</template>

<script setup>
import { fetchProducts } from '~/services/api';

const props = defineProps(['title', 'breadcrumbs', 'shortText', 'longText']);
const { title, breadcrumbs, shortText, longText } = props;
const route = useRoute();

const { data } = await useAsyncData('products', () => fetchProducts(route.query), { watch: [() => route.query] });

watch(() => route.query.page, value => {
    if(value) document.querySelector('h1').scrollIntoView();
})
</script>