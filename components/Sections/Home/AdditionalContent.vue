<template>
    <section class="mt-6">
        <ul class="flex flex-col gap-8">
            <li data-aos="fade-up" v-for="item in homeStore.additionalContent.items" class="flex flex-col">
                <h4 v-if="item.title"><NuxtLink :to="item.url ?? '/'">{{ item.title }}</NuxtLink></h4>
                <p>{{ item.content }}</p>
                <ul v-if="item.list" class="bg-yellow-2 px-10 py-6 flex flex-col gap-8 mt-8">
                    <li v-for="(listItem, index) in item.list" class="font-bold gap-2 items-start leading-[25px]" data-aos="fade-up" :data-aos-delay="100 * index">
                        <img src="https://newtrendy.pl/app/uploads/2023/08/check.png" class="float-left mr-2 size-[25px]" width="25" height="25" alt="">{{ listItem.title }}
                    </li>
                </ul>
            </li>
        </ul>

        <p class="mt-8">
            <NuxtLink :to="'/'">{{ $t('home.additional-content.use-searching') }}</NuxtLink>
        </p>
    </section>
</template>

<script setup>
const homeStore = useHomeStore();
</script>