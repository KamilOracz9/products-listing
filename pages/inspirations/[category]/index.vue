<template>
    <div v-if="!inspirationStore.category.isLoading" class="mb-20">
        <SectionsCommonBreadrumbs :breadcrumbs="inspirationStore.category.item.breadcrumbs" />

        <div class="pb-10">
            <p class="section-title">{{ inspirationStore.category.item.title }}</p>
        </div>

        <SectionsInspirationsArticles :articles="inspirationStore.category.item.articles" :categorySlug="inspirationStore.category.item.slug" />
    </div>
</template>

<script setup>
const inspirationStore = useInspirationStore();

onMounted(async () => {
    await inspirationStore.fetchCategory();
})
</script>