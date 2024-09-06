<template>
  <NuxtLayout name="403">
    <p class="title">403</p>
  </NuxtLayout>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
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