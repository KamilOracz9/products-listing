export default defineNuxtRouteMiddleware((to, from) => {
  const globalStore = useGlobalStore();

  if (from && to.path !== from.path) {
    globalStore.pageIsLoading = true;
  }
});