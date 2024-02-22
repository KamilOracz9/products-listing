<template>
    <div id="collections" class="mb-10">
        <h1 class="section-title">{{ $t('pages.collections.title') }}</h1>
        <div
            class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,278px),1fr))] gap-10 lg:grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))]">
            <NuxtLink :to="localePath({ name: 'categories', query: { collection: collection.slug } })" data-aos="fade-up"
                :aria-label="collection.name" v-for="(collection, index) in collectionStore.items">
                <figure class="zoom-in relative rounded-br-md xs:rounded-br-lg">
                    <picture>
                        <source media="(min-width: 1024px)" :srcset="collection.images.medium">
                        <img :loading="index < 6 ? 'eager' : 'lazy'" :title="collection.name" :alt="collection.name" :src="collection.images.small" class="aspect-[auto_714/441]" width="714" height="441">
                    </picture>
                </figure>

                <figCaption>
                    <h2 class="pt-4">{{ collection.name }}</h2>
                </figCaption>

                <p class="uppercase w-full justify-end flex gap-2 font-medium text-base mt-2 sm:text-lg lg:mt-10">
                    {{ $t('pages.collections.discover') }}
                    <Arrow :direction="'right'" />
                </p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const collectionStore = useCollectionStore();
const localePath = useLocalePath();

onMounted(async () => {
    await collectionStore.fetchCollections();
})
</script>