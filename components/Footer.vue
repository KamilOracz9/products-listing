<template>
    <div class="bg-black-2 text-white px-5 py-12 rounded-br-md lg:py-[61.5px] lg:pl-[46px] lg:pr-[78px] lg:rounded-br-lg">
        <!-- Items -->
        <ul class="footer__items">
            <FooterDropdown :translate="false" :item="products" :divider="'/'" />
            <FooterDropdown v-for="item in footerStore.data.items" :item="item" data-aos="fade-up" />
        </ul>

        <ul
            class="flex w-full flex-col gap-y-7 mt-6 lg:mt-12 lg:flex-row lg:flex-wrap lg:gap-y-24 lg:border-t lg:border-opacity-50 lg:border-white lg:pt-12">
            <!-- Contacts -->
            <FooterContact data-aos="fade-up" v-for="item in footerStore.data.contacts" :item="item" />
            <!-- Websites -->
            <li class="lg:w-1/4" data-aos="fade-up">
                <p class="text-medium-lg uppercase">{{ $t('our-websites') }}</p>
                <div class="flex mt-2 gap-3">
                    <img src="@/assets/icons/glob.svg" class="footer__icon" alt="Icon" title="" />
                    <div class="flex flex-col">
                        <a v-for="item in footerStore.data.websites" class="flex gap-3 footer__url" :href="item.url">{{
                            item.label }}</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useFooterStore } from '@/stores';

const footerStore = useFooterStore();
const categoryStore = useCategoryStore();

const products = computed(() => {
    return {
        label: 'products',
        slug: 'categories',
        items: categoryStore.mainCategories.map(mainCategory => {
            return {
                slug: mainCategory.slug,
                label: mainCategory.label
            }
        })
    };
})

onMounted(async () => {
    await footerStore.fetchData();
});
</script>