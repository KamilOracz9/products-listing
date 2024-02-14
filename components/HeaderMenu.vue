<template>
    <div class="py-7 flex flex-col fixed w-full bg-white lg:flex-row max-w-max-content"
        @mouseleave="() => { handleClose(); background.style.height = '0'; }">

        <SectionsHeaderLogo />
        <SectionsHeaderMobile :getPath="getPath" />
        <SectionsHeaderDesktop :background="background" :getPath="getPath" />

        <div ref="background" id="menu-background" class="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] absolute bg-white w-full top-[calc(100%-1px)] rounded-b-lg -z-10">
        </div>
    </div>
</template>

<script setup>
import slugify from '@/plugins/slugify';

const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();
const localePath = useLocalePath();

const background = ref(null);

const handleClose = () => {
    headerStore.setSubmenu('');
}

const getPath = (mainSlug, linkSlug) => {
    if (linkSlug === 'service' || linkSlug === 'certified-installers') mainSlug = 'service';

    return localePath({ name: mainSlug }) + `#${slugify(linkSlug)}`
}

onMounted(async () => {
    await clipboardStore.fetchItems();
});
</script>