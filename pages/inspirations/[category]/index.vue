<template>
    <div v-if="!inspirationStore.category.isLoading" class="mb-20">
        <SectionsCommonBreadrumbs :breadcrumbs="inspirationStore.category.item.breadcrumbs" />

        <div class="pb-10">
            <p class="uppercase text-[2rem] leading-[2.25rem] mb-10">{{ inspirationStore.category.item.title }}</p>
        </div>

        <SectionsInspirationsArticles :articles="inspirationStore.category.item.articles" />
    </div>
</template>

<script setup>
const inspirationStore = useInspirationStore();


onMounted(async () => {
    await inspirationStore.fetchCategory();
})
</script>