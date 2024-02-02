<template>
    <ul>
        <SectionsInspirationsCategoriesItem v-for="(category, index) in listing.categories" :key="index" :category="category" />
    </ul>
</template>

<script setup>
const listing = inject('listing');
</script>