<template>
    <section class="mt-10">
        <ul class="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:gap-10">
            <li v-for="(tile, index) in tiles" :key="index"
                class="bg-gray-2 rounded-br-[25px] p-6 font-medium text-lg items-center">
                <div class="flex gap-6 items-center lg:text-xl">
                    <img :src="tile.icon" class="h-[50px]" alt="">
                    <p>{{ tile.title }}</p>
                </div>
                <div class="flex items-center gap-2 py-4 lg:py-6">
                    <img src="@/assets/icons/arrow.svg" alt="">
                    <span class="flex flex-1 h-0 border-b-2 border-black"></span>
                </div>
                <ul class="font-normal text-base lg:text-[1.25rem] lg:flex lg:flex-col lg:gap-1">
                    <li v-for="phone in tile.phones"><a :href="`tel:${phone}`">{{ $t('pages.contact.phone') }}: {{ phone
                    }}</a></li>
                    <li v-for="email in tile.emails"><a :href="`mailto:${email}`">{{ email }}</a></li>
                </ul>
            </li>
        </ul>
    </section>
</template>

<script setup>
const contactStore = inject('contactStore');
const { tiles } = contactStore;
</script>