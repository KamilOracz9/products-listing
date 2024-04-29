<template>
    <li class="text-medium-lg flex flex-col gap-2 lg:w-1/4">
        <p class="uppercase">{{ title }}</p>
        <!-- Addresses -->
        <div class="text-normal-base flex gap-3" v-if="addresses?.length"><img src="@/assets/icons/map-pin.svg"
                class="footer__icon" width="16" height="16" alt="" />
            <div class="flex flex-col ">
                <p class="footer__url" v-for="address in addresses">{{ address }}</p>
            </div>
        </div>
        <!-- Phones -->
        <div class="text-normal-base flex gap-3" v-if="phones?.length"><img src="@/assets/icons/phone.svg"
                class="footer__icon" width="16" height="16" alt="" />
            <div class="flex flex-col">
                <NuxtLink :to="`tel:${phone}`" class="footer__url" v-for="phone in phones">{{ phone }}</NuxtLink>
            </div>
        </div>
        <!-- Emails -->
        <div class="text-normal-base flex gap-3" v-if="emails?.length"><img src="@/assets/icons/envelope.svg"
                class="footer__icon" width="16" height="16" alt="" />
            <div class="flex flex-col">
                <NuxtLink :to="`mailto:${email}`" class="footer__url" v-for="email in emails">{{ email }}</NuxtLink>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { FooterDepartment } from '~/types/layout.types';

const props = defineProps<{
    item: FooterDepartment;
}>();

const { title, phone: phones, email: emails, address: addresses } = toRefs(reactive(props.item));
</script>