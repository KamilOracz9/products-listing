<template>
    <div ref="headerMenu" class="py-7 flex flex-col fixed w-full bg-white max-w-max-content small-height:py-2 lg:flex-row"
        @mouseleave="() => { handleClose(); background.style.height = '0'; }">

        <SectionsHeaderLogo />
        <SectionsHeaderMobile :getPath="getPath" />
        <SectionsHeaderDesktop :background="background" :getPath="getPath" />

        <div ref="background" id="menu-background"
            class="drop-shadow-sm absolute bg-white w-full top-[calc(100%-1px)] rounded-b-lg -z-10">
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
    const shadow = 'drop-shadow-sm';

    if (window.scrollY) {
        headerMenu.value.classList.add(shadow);
        headerMenu.value.classList.add('lg:top-0');
    }
    else {
        headerMenu.value.classList.remove(shadow);
        headerMenu.value.classList.remove('lg:top-0');
    }
}

onMounted(async () => {
    await clipboardStore.fetchItems();

    document.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    document.removeEventListener('scroll', onScroll);
})
</script>