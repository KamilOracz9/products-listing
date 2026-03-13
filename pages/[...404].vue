<template>
  <NuxtLayout name="404">
    <p class="title">404</p>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  middleware: [
    () => {
      const event = useRequestEvent()
      setResponseStatus(event, 404)
    }
  ],
});

useHead(() => ({
  status: 404,
  title: "Page not found",
}));
</script>

<style scoped>
.title {
  font-size: 120px;
  line-height: 132px;
  text-align: center;
  padding: 120px 0;
  font-weight: 500;
}
</style>