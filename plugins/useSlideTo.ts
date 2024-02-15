const useSlideTo = defineNuxtPlugin(() => {
  const router = useRouter();

  const hash = router.currentRoute.value.hash;

  if (hash) document?.querySelector(router.currentRoute.value.hash)?.scrollIntoView();
})

export default useSlideTo;