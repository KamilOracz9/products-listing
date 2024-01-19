<template>
    <li class="text-medium-lg flex flex-col gap-2 lg:w-1/4">
        <p class="uppercase">{{ label }}</p>
        <!-- Addresses -->
        <div class="text-normal-base flex gap-3" v-if="addresses?.length"><img src="@/assets/icons/map-pin.svg"
                class="icon-16 white-filter translate-y-1" alt="" />
            <div class="flex flex-col">
                <p v-for="address in addresses">{{ address }}</p>
            </div>
        </div>
        <!-- Phones -->
        <div class="text-normal-base flex gap-3" v-if="phones?.length"><img src="@/assets/icons/phone.svg"
                class="icon-16 white-filter translate-y-1" alt="" />
            <div class="flex flex-col">
                <a :href="`tel:${phone}`" class="hover-opacity-60 cursor-pointer transition-all" v-for="phone in phones">{{ phone }}</a>
            </div>
        </div>
        <!-- Emails -->
        <div class="text-normal-base flex gap-3" v-if="emails?.length"><img src="@/assets/icons/envelope.svg"
                class="icon-16 white-filter translate-y-1" alt="" />
            <div class="flex flex-col">
                <a :href="`mailto:${email}`" class="hover-opacity-60 cursor-pointer transition-all" v-for="email in emails">{{ email }}</a>
            </div>
        </div>
    </li>
</template>

<script setup>
const props = defineProps(['item']);

const { item: { label, phones, addresses, emails } } = props;
</script>