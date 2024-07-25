<template>
    <section class="mb-20" :id="slugify($t('partner-zone'))">
        <p class="section-title">{{ title }}</p>

        <section class="for-professionas-section">
            <div v-html="section_1.left.text" class="section-text lg:my-0" data-aos="fade-up"></div>

            <div class="mt-6 lg:mt-0" data-aos="fade-up">
                <p class="font-medium text-xl sm:text-2xl">{{ section_1.right.title }}</p>

                <div v-html="section_1.right.text" class="section-text my-2 lg:my-4"></div>
            </div>
        </section>

        <section class="for-professionas-section mt-6">
            <SectionsCommonBox boxClass="bg-yellow-2" :box="section_2.left" />
            <SectionsCommonBox boxClass="bg-gray-5 rounded-tr-[25px] mt-6 md:rounded-tr-lg lg:mt-0"
                :box="section_2.right" />
        </section>

        <section class="for-professionas-section mt-10 gap-10 grid xs:grid-cols-2">
            <picture>
                <source media="(min-width: 1080px)" :srcset="section_3.left[0].desktop">
                <img :src="section_3.left[0].mobile" alt="">
            </picture>
            <picture>
                <source media="(min-width: 1080px)" :srcset="section_3.right[0].desktop">
                <img :src="section_3.right[0].mobile" alt="">
            </picture>
        </section>
    </section>
</template>

<script setup lang="ts">
import type { PartnerZone } from '@/types/for-professionals.types.ts';

const props = defineProps<{
    data: PartnerZone;
}>();
const { data } = toRefs(props);
const { title, section_1, section_2, section_3 } = toRefs(data.value);

console.log(section_3.value.left)
</script>
