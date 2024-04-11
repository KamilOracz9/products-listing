<template>
    <section class="mt-6">
        <ul class="employees grid gap-6 text-xs xs:grid-cols-2 lg:gap-10 lg:grid-cols-3 2xl:grid-cols-4">
            <li v-for="(employee, index) in employees" :key="index" class="flex flex-col gap-4">
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
        </ul>
    </section>
</template>

<script setup lang="ts">
import type { Employee } from '~/types/contact.types.ts';

const props = defineProps<{
    employees: Employee[];
}>();
const { employees } = toRefs(props);
</script>