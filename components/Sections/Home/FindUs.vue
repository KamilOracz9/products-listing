<template>
    <section class="hidden relative mt-16 md:block">
        <div class="lg:h-[360px]">
            <img class="h-full w-full object-cover" src="@/assets/images/find-shops.webp" alt="" loading="lazy" />
        </div>
        <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full p-5 lg:w-1/2 lg:left-1/2 lg:-translate-x-1/2">
            <p class="text-4xl whitespace-nowrap uppercase">Znajdź sklep stacjonarny</p>
            <div class="flex gap-4">
                <input placeholder="Wpisz nazwę miasta lub kod pocztowy" type="text" class="border-0 bg-white py-4 px-[1.125rem] flex-1" />
                <div>
                    <ButtonsTransparent label="Szukaj" tagType="link" url="/" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>