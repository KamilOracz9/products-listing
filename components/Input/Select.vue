<template>
    <div class="border border-t-0 border-black px-5 h-[50px] relative">
        <button @click="isOpen = !isOpen" type="button" class="flex justify-between w-full h-full items-center" :aria-label="selected?.label ?? $t('pages.contact.select-region')">{{
            selected?.label ?? $t('pages.contact.select-region') }}
            <Arrow />
        </button>
        <ul :class="isOpen ? '' : 'hidden'"
            class="top-[calc(100%+1px)] absolute bg-white w-[calc(100%+2px)] -left-[1px] border border-black border-t-0 max-h-[200px] overflow-y-auto">
            <li class="px-5 h-[50px] flex items-center border-b border-black last:border-b-0"
                @click="onSelected(option)"
                v-for="(option, index) in options.filter(option => option.value !== selected?.value)" :key="index">{{
                option.label }}</li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps(['options']);
const { options } = toRefs(props);

const selected = inject('selected');
const isOpen = ref(false);

const onSelected = (value) => {
    selected.value = value;
    isOpen.value = false;
}

</script>