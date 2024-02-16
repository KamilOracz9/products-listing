<template>
    <div class="relative">
        <textarea ref="inputRef" :id="id" :name="name" v-if="type === 'textarea'" rows="5"
            class="resize-none rounded-[3px] w-full px-3 py-4 bg-gray-2 border-0 focus:outline-none focus:ring-0 peer" placeholder=" " ></textarea>

        <input ref="inputRef" :type="type" :id="id" :name="name" v-if="type !== 'textarea'"
            class="rounded-[3px] w-full px-3 py-4 bg-gray-2 border-0 focus:outline-none focus:ring-0 peer" placeholder=" " />

        <label for="name" @click="inputRef.focus()"
            class="absolute text-gray-3 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{{ label }}</label>
    </div>
</template>

<script setup>
const { type, label, id, name } = defineProps(['type', 'label', 'id', 'name'])

const inputRef = ref(null);
</script>