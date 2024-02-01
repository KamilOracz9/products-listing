<template>
    <Teleport to="#modals">
        <div v-if="isOpen" class="bg-[rgba(255,255,255,.5)] w-full h-full relative overlay cursor-pointer" @click="close">
            <div>
                <slot name="header" />
            </div>

            <div class="absolute z-10 cursor-auto w-full h-full overlay">
                <slot name="content" />
            </div>

            <div>
                <slot name="navigation" />
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const isOpen = inject('modalIsOpen');

const close = () => {
    if (event.target.classList.contains('overlay')) isOpen.value = false;
}

watch(isOpen, value => {
    const body = document.querySelector('body');
    value
        ? body?.classList.add('overflow-hidden')
        : body?.classList.remove('overflow-hidden');
})
</script>