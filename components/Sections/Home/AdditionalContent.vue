<template>
    <section class="mt-6">
        <ul class="flex flex-col gap-8">
            <li v-for="item in homeStore.additionalContent.items" class="flex flex-col">
                <h4><NuxtLink :to="item.url">{{ item.title }}</NuxtLink></h4>
                <p>{{ item.content }}</p>
                <ul v-if="item.list" class="bg-yellow px-10 py-6 flex flex-col gap-8 mt-8">
                    <li v-for="listItem in item.list" class="font-bold gap-2 items-start leading-[25px]">
                        <img src="https://newtrendy.pl/app/uploads/2023/08/check.png" class="float-left mr-2" width="25" height="25" alt="">{{ listItem.title }}
                    </li>
                </ul>
            </li>
        </ul>

        <h6 class="mt-8">
            <NuxtLink>Skorzystaj z naszej wyszukiwarki i znajdź swój sklep z kabinami prysznicowymi.</NuxtLink>
        </h6>
    </section>
</template>

<script setup>
const homeStore = useHomeStore();
</script>