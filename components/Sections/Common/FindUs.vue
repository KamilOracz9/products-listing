<template>
    <section class="hidden relative mt-16 mb-12 md:block">
        <div class="lg:h-[360px]">
            <img class="h-full w-full object-cover" src="@/assets/images/find-shops.webp" alt="" loading="lazy" />
        </div>
        <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full p-5 lg:w-1/2 lg:left-1/2 lg:-translate-x-1/2">
            <p class="text-4xl whitespace-nowrap uppercase">{{ $t('home.map.title') }}</p>
            <div class="flex gap-4">
                <input v-model="city_or_code" :placeholder="$t('home.map.placeholder')" type="text"
                    class="border-0 bg-white py-4 px-[1.125rem] flex-1" />
                <div class="[&>button]:border-black">
                    <ButtonsTransparent :label="$t('search')" tagType="link"
                        :url="localePath({ name: 'place-to-buy', query: { city_or_code } })" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const localePath = useLocalePath();

const city_or_code = ref('');
</script>