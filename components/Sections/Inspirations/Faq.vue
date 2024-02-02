<template>
    <section class="mb-10">
        <div class="pb-5">
            <p class="text-[1.5rem] font-medium pb-5 border-b border-gray-1 mb-5">{{
                $t('pages.inspirations.often-questions') }}</p>
            <p>{{ $t('pages.inspirations.often-questions-text') }}</p>
        </div>

        <ul class="flex flex-col gap-1">
            <li v-for="(item, index) in listing.faq">
                <SectionsCommonAccordion :label="item.question" :id="`faq-question-${index}`">
                    <p>{{ item.answer }}</p>
                </SectionsCommonAccordion>
            </li>
        </ul>
    </section>
</template>

<script setup>
const listing = inject('listing');
const openAccordionId = ref('');
provide('openAccordionId', openAccordionId);
</script>