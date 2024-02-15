<template>
    <section class="mt-6 grid gap-4 md:grid-cols-2 md:gap-10 lg:mt-10" :id="slugify($t('certified-installers'))">
        <SectionsCommonBox boxClass="bg-yellow-2" :box="boxLeft" type="select">
            <InputSelect :options="boxLeft.options" />
        </SectionsCommonBox>
        <SectionsCommonBox boxClass="bg-gray-5 rounded-br-[25px] md:rounded-br-lg lg:mt-0" :box="boxRight" />
    </section>
</template>

<script setup lang="ts">
import slugify from "~/plugins/slugify";
import type { IServiceSection4 } from "~/types/service";

const props = defineProps<{
    section: IServiceSection4
}>()

const { section: { boxLeft, boxRight } } = props;
</script>