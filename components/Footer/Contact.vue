<template>
    <li class="text-medium-lg flex flex-col gap-2 lg:w-1/4">
        <p class="uppercase">{{ label }}</p>
        <!-- Addresses -->
        <div class="text-normal-base flex gap-3" v-if="addresses?.length"><img src="@/assets/icons/map-pin.svg"
                class="footer__icon" alt="" />
            <p class="flex flex-col footer__url" v-for="address in addresses">{{ address }}</p>
        </div>
        <!-- Phones -->
        <div class="text-normal-base flex gap-3" v-if="phones?.length"><img src="@/assets/icons/phone.svg"
                class="footer__icon" alt="" />
            <div class="flex flex-col">
                <NuxtLink :to="`tel:${phone}`" class="footer__url" v-for="phone in phones">{{ phone }}</NuxtLink>
            </div>
        </div>
        <!-- Emails -->
        <div class="text-normal-base flex gap-3" v-if="emails?.length"><img src="@/assets/icons/envelope.svg"
                class="footer__icon" alt="" />
            <div class="flex flex-col">
                <NuxtLink :to="`mailto:${email}`" class="footer__url" v-for="email in emails">{{ email }}</NuxtLink>
            </div>
        </div>
    </li>
</template>

<script setup>
const props = defineProps(['item']);

const { item: { label, phones, addresses, emails } } = props;
</script>