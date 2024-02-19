<template>
    <Suspense>
        <div class="mb-20">
            <SectionsCommonBreadrumbs :breadcrumbs="inspirationStore.category.item?.breadcrumbs" />

            <div class="pb-10">
                <h1 class="section-title">{{ inspirationStore.category.item?.title }}</h1>
            </div>

            <SectionsInspirationsArticles :articles="inspirationStore.category.item?.items"
                :categorySlug="inspirationStore.category.item?.slug" />
        </div>

        <template #fallback>
            <div class="h-[70svh]">
               <Loading />
            </div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
const inspirationStore = useInspirationStore();

onMounted(async () => {
    await inspirationStore.fetchCategory();
})
</script>