<template>
    <ul class="hidden gap-6 items-end lg:flex w-full" v-if="background">
        <SectionsHeaderDropdownDesktop :slug="menuItem.slug" :url="menuItem.url" :name="menuItem.label"
            :background="background" :type="menuItem.type" v-for="menuItem in headerStore.headerMenu.items">
            <li v-for="submenuItem in menuItem.items" class="whitespace-nowrap" v-if="!menuItem.type">
                <RouterLink :to="getPath(menuItem.slug, $t(submenuItem.slug))" class="hover-opacity-60">{{
                    $t(submenuItem.slug) }}
                </RouterLink>
            </li>
            <li v-if="menuItem.type === 'products'">
                <ul class="grid w-full px-[50px] gap-5 grid-cols-5">
                    <!-- <li class="border-r border-gray-1 pr-5 last:border-r-0 flex flex-col gap-10">
                        <ul>
                            <li>
                                <NuxtLink :to="localePath({ name: 'made-to-measure' })">
                                    <img loading="lazy" width="65" height="65" class="size-[65px]"
                                        src="https://newtrendy.pl/app/uploads/2023/12/ikona-na-wymiar.png?ver=1701856289"
                                        :alt="$t('pages.made-to-measure.title')" :title="$t('made-to-measure')">
                                    <p class="py-3">{{ $t('pages.made-to-measure.title') }}</p>
                                </NuxtLink>
                                <ul class="text-sm">
                                    <li>
                                        <NuxtLink :to="{ path: localePath({ name: 'made-to-measure' }) }">Wymiar</NuxtLink>
                                    </li>

                                    <li>
                                        <NuxtLink :to="{ path: localePath({ name: 'made-to-measure' }) }">Kształt</NuxtLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li> -->
                    <li v-for="column in categoryStore.list.items.columns"
                        class="border-r border-gray-1 pr-5 last:border-r-0 flex flex-col gap-10">
                        <ul v-for="category in column.items">
                            <li>
                                <NuxtLink :to="localePath({ name: 'categories' }) + `/${category.slug}`">
                                    <img loading="lazy" width="65" height="65" class="size-[65px]" :src="category.iconUrl"
                                        :alt="category.label" :title="category.label">
                                    <p class="py-3">{{ category.label }}</p>
                                </NuxtLink>
                                <ul class="text-sm">
                                    <li v-for="subcategory in category.items">
                                        <NuxtLink
                                            :to="{ path: localePath({ name: 'categories' }) + `/${category.slug}`, query: { type: subcategory.slug } }">
                                            {{ subcategory.label }}</NuxtLink>
                                        <ul class="pl-2 py-2" v-if="subcategory.items">
                                            <li v-for="subsubcategory in subcategory.items">
                                                <NuxtLink
                                                    :to="{ path: localePath({ name: 'categories' }) + `/${category.slug}`, query: { type: subcategory.slug, doors: subsubcategory.slug } }">
                                                    {{ subsubcategory.label }}</NuxtLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </SectionsHeaderDropdownDesktop>

        <ButtonsPlaceToBuy />
    </ul>
</template>

<script setup>
const { background, getPath } = defineProps(['background', 'getPath']);

const headerStore = useHeaderStore();
const categoryStore = useCategoryStore();
</script>