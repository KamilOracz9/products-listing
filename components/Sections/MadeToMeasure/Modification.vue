<template>
    <div class="row modifications" :id="data.hashtag" data-aos="fade-up">
        <div class="column">
            <h2><img :src="plusIcon" width="30" height="30" alt="">{{ data.title }}</h2>
            <div v-html="data.html" />
            <div class="flex flex-col gap-4 xs:flex-row">
                <a href="#menu"
                    class="transparent-button p-0 w-full min-h-[30px] xs:min-h-[56px] border border-black xs:aspect-[auto_1/1] grid place-items-center">
                    <Arrow :direction="'upper'" :width="20" />
                </a>
                <ButtonsTransparent tag-type="link" :label="data.button" :url="data.link" />
            </div>
        </div>

        <slot />
    </div>
</template>

<script setup lang="ts">
import type { BaseSection, Section10, Section5 } from '~/types/made-to-measure.types';

const plusIcon = 'https://newtrendy.pl/app/uploads/2023/07/krzyzyk.jpg';

const props = withDefaults(defineProps<{
    data: BaseSection | Section5 | Section10;
}>(), {})

const { data } = toRefs(props);
</script>