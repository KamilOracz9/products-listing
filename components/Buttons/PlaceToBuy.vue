<template>
    <li class="w-full justify-center flex lg:translate-y-2 lg:w-fit lg:justify-start">
        <NuxtLink :to="localePath('place-to-buy')"
            class="text-white uppercase bg-black-2 text-medium-lg w-[150px] h-[40px] flex items-center justify-center rounded-br-[15px]">
            {{ $t('place-to-buy') }}</NuxtLink>
    </li>
</template>


<script setup>
</script>