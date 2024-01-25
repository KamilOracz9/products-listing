<template>
    <div class="py-7 flex flex-col fixed w-full bg-white lg:flex-row max-w-max-content"
        @mouseleave="() => { handleClose(); background.style.height = '0'; }">

        <SectionsHeaderLogo />
        <SectionsHeaderMobile />
        <SectionsHeaderDesktop :background="background" />

        <div ref="background" class="absolute bg-white w-full top-[calc(100%-1px)] rounded-b-lg -z-10"></div>
    </div>
</template>

<script setup>
const headerStore = useHeaderStore();
const clipboardStore = useClipboardStore();

const background = ref(null);

const handleClose = () => {
    headerStore.setSubmenu('');
}

onMounted(() => {
    clipboardStore.fetchItems();
});
</script>