<template>
    <div class="flex flex-col h-screen xl:flex-row">
        <div class="w-full flex-1 bg-black">
            <slot />
        </div>

        <div class="h-[30%] w-full p-4 overflow-y-auto xl:h-full xl:w-[20%]">
            <Legend />
        </div>
    </div>
</template>