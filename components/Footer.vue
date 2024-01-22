<template>
    <div class="bg-black-2 text-white px-5 py-12 rounded-br-md lg:py-[61.5px] lg:pl-[46px] lg:pr-[78px] lg:rounded-br-lg">
        <!-- Items -->
        <ul class="flex flex-col gap-y-2 w-full lg:flex-row lg:gap-10 lg:justify-between lg:flex-wrap">
            <FooterDropdown v-for="item in footerStore.data.items" :item="item" />
        </ul>

        <ul class="flex w-full flex-col gap-y-7 mt-6 lg:mt-12 lg:flex-row lg:flex-wrap lg:gap-y-24 lg:border-t lg:border-opacity-50 lg:border-white lg:pt-12">
            <!-- Contacts -->
            <FooterContact v-for="item in footerStore.data.contacts" :item="item" />
            <!-- Websites -->
            <li class="lg:w-1/4">
                <p class="text-medium-lg uppercase">{{ $t('our-websites') }}</p>
                <div class="flex mt-2 gap-3">
                    <img src="@/assets/icons/glob.svg" class="icon-16 white-filter translate-y-1" alt="" />
                    <ul class="flex flex-col">
                        <FooterWebsite v-for="item in footerStore.data.websites" :item="item" />
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useFooterStore } from '@/stores/footerStore';

const footerStore = useFooterStore();

onMounted(() => {
    footerStore.fetchData();
});
</script>