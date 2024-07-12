<template>
    <section>
        <ul class="flex overflow-x-auto gap-3 no-scrollbar 3xl:gap-8">
            <li class="bg-gray-2 p-2 rounded-br-xs max-w-[45%] flex-[0_0_45%] sm:max-w-[33.3%] sm:flex-[0_0_33.3%] xl:max-w-auto xl:flex-1"
                v-for="category in categories">
                <NuxtLink :to="localePath({ name: 'categories' }) + `/${category.slug}`"
                    class="w-full h-full flex flex-col" :title="category.name" :aria-label="category.name">
                    <p class="text-gray-1 text-sm mb-1">({{ category.count }})</p>
                    <div class="mx-auto px-3.5">
                        <img class="max-w-[80px] aspect-[auto_1/1]" width="100" height="100" :src="category.iconUrl"
                            :alt="category.name" :title="category.name">
                    </div>
                    <p class="text-xs uppercase font-medium mt-auto">{{ category.name }}</p>
                </NuxtLink>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

const props = defineProps<{
    categories: {
        count: number;
        id: number;
        name: string;
        slug: string;
    }[];
}>()

const { categories } = toRefs(props);
</script>