<template>
    <div v-if="locale === 'pl'"
        class="bg-yellow-1 text-white rounded-tr-[36px] font-medium text-lg px-5 h-[108px] justify-center flex flex-col sm:px-[12%] sm:text-xl">
        <p>{{ $t('product.yellow-box') }}</p>
        <a class="uppercase" href="konfiguratorkabin.pl">konfiguratorkabin.pl</a>
    </div>
</template>

<script setup>
const { locale } = useI18n();
</script>