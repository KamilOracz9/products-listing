<template>
    <ul class="hidden gap-6 items-end lg:flex w-full" v-if="background">
        <SectionsHeaderDropdownDesktop :slug="menuItem.slug" :url="menuItem.url" :name="menuItem.label" :background="background"
            :type="menuItem.type" v-for="menuItem in headerStore.headerMenu.items">
            <li v-for="submenuItem in menuItem.items" class="whitespace-nowrap" v-if="!menuItem.type">
                <RouterLink :to="localePath({ name: submenuItem.slug })" class="hover-opacity-60">{{
                    $t(submenuItem.slug) }}
                </RouterLink>
            </li>
            <li v-for="submenuItem in menuItem.items" v-if="menuItem.type === 'products'">
                <ul class="grid w-full px-[50px] gap-5"
                    :class="menuItem.items.columns.length ? `grid-cols-5` : ''">
                    <li v-for="column in menuItem.items.columns"
                        class="border-r border-gray-1 pr-5 last:border-r-0 flex flex-col gap-10">
                        <ul v-for="category in column.items">
                            <li>
                                <NuxtLink :to="category.url">
                                    <img width="65" :src="category.iconUrl" alt="">
                                    <p class="py-3">{{ category.label }}</p>
                                </NuxtLink>
                                <ul class="text-sm">
                                    <li v-for="subcategory in category.items">
                                        <NuxtLink :to="subcategory.url">{{ subcategory.label }}</NuxtLink>
                                        <ul class="pl-2 py-2" v-if="subcategory.items">
                                            <li v-for="subsubcategory in subcategory.items">
                                                <NuxtLink :to="subsubcategory.url">{{ subsubcategory.label }}</NuxtLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>

                <RouterLink :to="localePath({ name: submenuItem.slug })" v-if="submenuItem.iconUrl"
                    class="px-6 flex flex-col gap-2 flex-1">
                    <img width="60" :src="submenuItem.iconUrl" alt="">
                    <span class="hover-opacity-60">{{ submenuItem.label }}</span>
                    <ul>
                        <li v-for="subcategory in submenuItem.items" class="text-sm">
                            <RouterLink :to="localePath({ name: subcategory.slug })" class="hover-opacity-60">{{
                                subcategory.label }}</RouterLink>
                        </li>
                    </ul>
                </RouterLink>
            </li>
        </SectionsHeaderDropdownDesktop>

        <ButtonsPlaceToBuy />
    </ul>
</template>

<script setup>
const { background } = defineProps(['background']);

const headerStore = useHeaderStore();
const localePath = useLocalePath();
</script>