<template>
  <div class="flex w-screen h-screen justify-center items-center flex-col">
    <img src="/assets/images/logo.svg" class="aspect-[auto_4/3] w-[181px] small-height:w-[100px]" width="214" alt="NEW TRENDY" title="NEW TRENDY" />
    <h1 class="text-lg mt-4">Coś poszło nie tak</h1>
    <!-- <p>{{ error?.message }}</p> -->
    <NuxtLink to="/" class="underline">Wróć do strony głównej</NuxtLink>
  </div>
</template>

<script setup>
defineProps({ error: Object })
</script>
