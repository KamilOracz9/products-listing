<template>
    <div class="border relative">
        <input type="text" @mousedown="toggleOpen" @input="onInput($event.target.value)" :class="selectKey ? `select-${selectKey}` : ''"
            class="border-0 w-full py-3.5 px-5 focus:ring-0 placeholder:text-gray-1 placeholder:text-sm"
            v-model="workSearch" :placeholder="placeholder">
        <ul :class="isOpen ? '' : 'hidden'"
            class="top-[calc(100%+1px)] max-h-[225px] overflow-y-auto no-scrollbar absolute bg-white w-[calc(100%+2px)] -left-[1px] border border-t-0 z-10">
            <li @click="() => {onSelect(option, selectKey); isOpen = false}" class="px-5 h-[50px] flex items-center border-b last:border-b-0"
                v-for="(option, index) in options.items" :key="index">{{
                    option.label }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import debounce from 'debounce';

const props = defineProps(['searchKey', 'options', 'placeholder', 'selectKey'])

const { searchKey, options, placeholder, selectKey } = props;

const search = inject<Ref<string>>(searchKey);
const onSelect = inject<Function>('onSelect');

const workSearch = ref('');
const isOpen = ref(false);

const onInput = debounce((value) => {
    if (search) {
        if (value.length < 3) {
            // search.value = '';
            isOpen.value = false;
        }
        else {
            search.value = value;
            isOpen.value = true;
        }
    }
}, 300);

const toggleOpen = () => {
    if (workSearch.value.length < 3) isOpen.value = false;
    else isOpen.value = !isOpen.value;
}

onMounted(() => {
    // watch(workSearch, value => onInput(value))
    watch(search, value => {
        workSearch.value = value;
    })

    window.addEventListener('click', () => {
        if(!event.target.classList.contains(`select-${selectKey}`)) isOpen.value = false;
    })
})
</script>