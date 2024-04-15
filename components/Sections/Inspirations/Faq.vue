<template>
    <section class="mb-10" id="faq">
        <div class="pb-5">
            <p class="text-[1.5rem] font-medium pb-5 border-b border-gray-1 mb-5">{{ title }}</p>
            <p>{{text }}</p>
        </div>

        <ul class="flex flex-col gap-1">
            <li v-for="(item, index) in items">
                <SectionsCommonAccordion :label="item.question" :id="`faq-question-${index}`">
                    <p>{{ item.answer }}</p>
                </SectionsCommonAccordion>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import type { Faq } from '~/types/common.types';

const props = defineProps<{
    faq: Faq;
}>();

const { faq } = toRefs(props);
const { title, text, items } = toRefs(faq.value);

const openAccordionId = ref('');
provide('openAccordionId', openAccordionId);
</script>