<template>
    <div v-if="!serviceStore.isLoading && serviceStore.sections">
        <SectionsCommonBreadrumbs :breadcrumbs="serviceStore.breadcrumbs" />

        <p class="section-title">{{ serviceStore.title }}</p>

        <section class="for-professionas-section">
            <div v-html="serviceStore.sections.section1.text" class="section-text lg:my-0"></div>

            <div class="mt-6 lg:mt-0">
                <p class="font-medium text-xl sm:text-2xl">{{ serviceStore.sections.section2.title }}</p>

                <div v-html="serviceStore.sections.section2.text" class="section-text my-2 lg:my-4"></div>
            </div>
        </section>

        <SectionsServiceSection3 :section="serviceStore.sections.section3" />
        <SectionsServiceSection4 :section="serviceStore.sections.section4" />
        <SectionsServiceSection5 v-if="selected" :section="serviceStore.sections.section5" />
    </div>
</template>

<script setup lang="ts">
import useSlideTo from '~/plugins/useSlideTo';

const serviceStore = useServiceStore();

const selected: Ref<{
    label: string;
    value: string;
} | null> = ref(null);

provide('selected', selected)

onMounted(async () => {
    await serviceStore.fetchData().then(() => serviceStore.fetchCities());

    useSlideTo();

    selected.value = serviceStore.sections?.section4.boxLeft.options[0];
})
</script>