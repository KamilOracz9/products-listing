<template>
    <div ref="headerMenu" class="py-7 flex flex-col fixed w-full bg-white lg:flex-row max-w-max-content"
        @mouseleave="() => { handleClose(); background.style.height = '0'; }">

        <SectionsHeaderLogo />
        <SectionsHeaderMobile :getPath="getPath" />
        <SectionsHeaderDesktop :background="background" :getPath="getPath" />

        <div ref="background" id="menu-background"
            class="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] absolute bg-white w-full top-[calc(100%-1px)] rounded-b-lg -z-10">
        </div>
    </div>
</template>

<script setup>
import slugify from '@/plugins/slugify';

const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();
const localePath = useLocalePath();

const background = ref(null);
const headerMenu = ref(null);

const handleClose = () => {
    headerStore.setSubmenu('');
}

const getPath = (mainSlug, linkSlug) => {
    if (linkSlug === 'service' || linkSlug === 'certified-installers') mainSlug = 'service';

    return localePath({ name: mainSlug }) + `#${slugify(linkSlug)}`
}

const onScroll = () => {
    const shadow = 'shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]';

    if (window.scrollY) headerMenu.value.classList.add(shadow);
    else headerMenu.value.classList.remove(shadow);
}

onMounted(async () => {
    await clipboardStore.fetchItems();

    document.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    document.removeEventListener('scroll', onScroll);
})
</script>