<template>
    <div class="w-full justify-center flex lg:translate-y-2 lg:w-fit lg:justify-start">
        <NuxtLink :to="localePath('place-to-buy')" :aria-label="$t('place-to-buy')"
            class="text-white uppercase bg-black-2 text-medium-lg w-fit whitespace-nowrap px-2 flex items-center justify-center rounded-br-[15px] xl:w-[150px] xl:text-xl xl:h-[40px]">
            {{ $t('place-to-buy') }}</NuxtLink>
    </div>
</template>
<script setup>
const localePath = useLocalePath();
</script>