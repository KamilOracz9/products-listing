<template>
    <div>
        {{ $t('place-to-buy') }}
    </div>
</template>

<script setup>
defineI18nRoute({
    paths: {
        "en": "/place-to-buy",
        "pl": "/gdzie-kupic-nasze-produkty"
    }
})
</script>