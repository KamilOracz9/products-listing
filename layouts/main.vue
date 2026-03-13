<template>
    <!-- <ClientOnly> -->
        <!-- <UiDialog /> -->
    <!-- </ClientOnly> -->

    <div class="flex justify-center font-breuer">
        <div v-if="!pending && data" class="flex flex-col min-h-screen w-full relative">
            <header class="relative z-30">
                <TopBar :data="data.socials" />
                <HeaderMenu :data="data.header" />
            </header>

            <main class="min-h-[80vh] flex-1 mt-[144px] small-height:mt-[76px] relative grid-content">
                <template v-if="pending">
                    <Loading />
                </template>
                <template v-else>
                    <slot />
                </template>
            </main>

            <footer class="grid-content">
                <Footer :data="data.footer" />
                <p class="text-center py-6 uppercase text-[1.25rem]">New trendy {{ new Date().getFullYear() }}</p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DataKeys } from '~/enums/dataKeys';
import { fetchLayoutData } from '~/services/api/layout';

// const refreshing = ref(false)

// const setIsRefreshing = async () => refreshing.value = true;

// provide('setIsRefreshing', setIsRefreshing);

const { locales, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const nuxtApp = useNuxtApp()

provide('switchLocalePath', switchLocalePath);

const lang = ref(getLocaleIso());

watch(switchLocalePath, () => {
    // console.log(locales.value.find(({ code }) => code === locale.value)?.language)
    lang.value = locales.value.find(({ code }) => code === locale.value)?.language;
})



// const { data, pending } = await useAsyncData(DataKeys.LAYOUT_DATA, async () => fetchLayoutData(lang.value), { watch: [lang] });

const { data, pending } = await useAsyncData(
  `${DataKeys.LAYOUT_DATA}-${lang.value}`,
  () => fetchLayoutData(lang.value),
  {
    getCachedData(key) {
        return (nuxtApp.payload.data[key] || nuxtApp.static.data[key]) ?? null;
    }
  }
)

onMounted(async () => {
    const topBar = document.getElementById('top-bar');

    document.addEventListener('scroll', () => {
        window.scrollY ? topBar?.classList.remove('xs:flex') : topBar?.classList.add('xs:flex');
    })
})
</script>