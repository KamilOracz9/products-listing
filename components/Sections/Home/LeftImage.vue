<template>
    <section class="bg-gray-2 mt-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-6 xl:gap-28">
        <div class="h-[400px] lg:h-fit">
            <picture>
                <source media="(min-width: 640px)"
                    srcset="https://newtrendy.pl/app/uploads/2023/07/na_wymiar_800x400.jpg" />
                <img :title="'Kabiny prysznicowe'" loading="lazy" src="https://newtrendy.pl/app/uploads/2023/07/na_wymiar_800x400.jpg" :alt="'Kabiny prysznicowe'" class="w-full h-full object-cover rounded-br-lg">
            </picture>
        </div>
        <div class="uppercase p-6 lg:max-w-[90%] xl:max-w-[70%]">
            <p class="text-lg xl:text-[1.625rem]">Kabiny prysznicowe</p>
            <p class="text-[1.75rem] mt-2 xl:text-[3.75rem] xl:mt-8">Na wymiar</p>
            <p class="normal-case py-6 text-sm lg:text-base">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus dolorem exercitationem unde autem
                soluta possimus quia molestias aperiam voluptates ducimus magnam culpa incidunt voluptatibus adipisci porro,
                odit nisi a saepe!</p>
            <NuxtLink :to="'/'" class="flex gap-2 text-[1.25rem] font-medium">{{ $t('more') }} <img src="@/assets/icons/arrow.svg"
                    class="-rotate-90 -translate-y-[2px]" alt=""></NuxtLink>
        </div>
    </section>
</template>

<script setup>

</script>