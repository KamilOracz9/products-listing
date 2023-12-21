<template>
    <div class="flex flex-col h-screen xl:flex-row">
        <div class="w-full flex-1">
            <slot />
        </div>

        <div class="h-[30%] w-full overflow-y-auto flex-col border-t-2 xl:h-full xl:w-[20%] xl:border-l-2 xl:border-t-0">
            <Legend />
            <Filters />
            <ActiveLocation />
        </div>
    </div>
</template>