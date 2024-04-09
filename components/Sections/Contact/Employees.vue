<template>
    <section class="mt-6">
        <ul class="employees grid gap-6 text-xs xs:grid-cols-2 lg:gap-10 lg:grid-cols-3 2xl:grid-cols-4">
            <li v-for="(employee, index) in activeEmployees" :key="index" class="flex flex-col gap-4">
                <div>
                    <img :src="employee.image" alt="" class="rounded-br-[25px] w-full aspect-[1/1]">
                </div>

                <div>
                    <p class="font-medium text-lg">{{ employee.name }}</p>
                    <p>{{ employee.title }}</p>
                </div>

                <ul class="flex flex-col gap-4">
                    <li class="flex gap-2 items-center" v-for="(phone, index) in employee.phone" :key="index">
                        <img class="h-5" src="@/assets/icons/phone.svg" alt=""> {{ phone }}
                    </li>

                    <li class="flex gap-2 items-center" v-for="(email, index) in employee.email" :key="index">
                        <img class="h-5" src="@/assets/icons/envelope.svg" alt=""> {{ email }}
                    </li>
                </ul>

                <p v-html="employee.info"></p>
            </li>
            <li v-if="!activeEmployees?.length" class="flex flex-col gap-4 placeholder mt-6" v-for="index in 4">
                <img src="@/assets/icons/customer-placeholder.svg" alt=""
                    class="gray-2-filter rounded-br-[25px] w-full aspect-[1/1]">

                <div class="flex flex-col gap-4 px-4">
                    <p class="font-medium text-lg bg-gray-2 h-3 rounded-[10px] w-[70%]"></p>

                    <p class="font-medium text-lg bg-gray-2 h-3 rounded-[10px] w-[80%]"></p>

                    <p class="font-medium text-lg bg-gray-2 h-3 rounded-[10px] w-full"></p>
                    <p class="font-medium text-lg bg-gray-2 h-3 rounded-[10px] w-full"></p>
                    <p class="font-medium text-lg bg-gray-2 h-3 rounded-[10px] w-full"></p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import type { Employee } from '~/types/contact.types.ts';

const props = defineProps<{
    employees: Employee[];
}>();
const { employees } = toRefs(props);

const selected = inject('selected');

const activeEmployees = computed(() => {
    if (!selected) return employees.value;
    if (!selected.value) return null;
    return employees.value.filter(employee => employee.regions.includes(selected.value.value));
})

</script>