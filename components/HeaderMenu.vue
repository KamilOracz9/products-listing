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
const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();
const localePath = useLocalePath();
const i18n = useI18n();

const background = ref(null);
const headerMenu = ref(null);

const handleClose = () => {
    headerStore.setSubmenu('');
}

const getPath = (mainSlug, linkSlug) => {
    if (linkSlug === i18n.t('service') || linkSlug === i18n.t('certified-installers')) mainSlug = 'service';

    if (linkSlug === i18n.t(mainSlug)) return localePath({ name: mainSlug });

    return localePath({ name: mainSlug }) + `#${slugify(linkSlug)}`;
}

const setHeader = () => {
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

const onScroll = () => {
    setHeader();
}

onMounted(async () => {
    setHeader();

    await clipboardStore.fetchItems();
    
    document.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    document.removeEventListener('scroll', onScroll);
})
</script>