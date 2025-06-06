<template>
    <div class="border relative">
        <input autocomplete="off" :disabled="disabled" :class="modelKey ? `select-${modelKey}` : ''" type="text" v-model="model" :onfocus="() => toggleOpen()"
            @input="($event) => onInput((<HTMLInputElement>$event.target)?.value)"
            class="disabled:bg-gray-6 border-0 w-full py-3.5 px-5 focus:ring-0 placeholder:text-gray-1 placeholder:text-sm"
            :placeholder="placeholder">
        <ul :class="isOpen ? '' : 'hidden'"
            class="top-[calc(100%+1px)] max-h-[225px] overflow-y-auto no-scrollbar absolute bg-white w-[calc(100%+2px)] -left-[1px] border border-t-0 z-10">
            <li @click="() => onSelect(option.name)" class="px-5 h-[50px] flex items-center border-b last:border-b-0"
                v-for="(option, index) in options" :key="index">{{
                    option.name }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import debounce from 'debounce';

const props = defineProps(['modelKey', 'options', 'placeholder', 'disabled'])

const { options, placeholder, modelKey } = toRefs(props);

const model = inject<Ref<string>>(modelKey?.value) ?? ref('');
const isOpen = ref(false);

const onInput = debounce((value) => {
    if (value.length < 3) {
        isOpen.value = false;
    }
    else {
        isOpen.value = true;
    }
}, 300);

const toggleOpen = () => {
    if (model.value) {
        if (model.value.length < 3) isOpen.value = false;
        else isOpen.value = !isOpen.value;
    }
}

const onSelect = (value: string) => {
    isOpen.value = false;
    model.value = value;
}

onMounted(() => {
    window.addEventListener('click', (event) => {
        if (!(<HTMLInputElement>event.target)?.classList.contains(`select-${modelKey?.value}`)) isOpen.value = false;
    })
})
</script>