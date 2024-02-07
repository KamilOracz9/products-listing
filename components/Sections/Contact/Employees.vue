<template>
    <section class="mt-6">
        <ul class="grid gap-6 text-xs xs:grid-cols-2 lg:gap-10 lg:grid-cols-3 2xl:grid-cols-4">
            <li v-for="(employee, index) in employees" :key="index" class="flex flex-col gap-4">
                <div>
                    <img :src="employee.image" alt="" class="rounded-br-[25px] w-full aspect-[1/1]">
                </div>

                <p class="font-medium text-lg">{{ employee.name }}</p>

                <ul class="flex flex-col gap-2">
                    <li class="flex gap-2 items-center" v-for="(phone, index) in employee.phones" :key="index">
                        <img class="h-5" src="@/assets/icons/phone.svg" alt=""> {{ phone }}
                    </li>

                    <li class="flex gap-2 items-center" v-for="(email, index) in employee.emails" :key="index">
                        <img class="h-5" src="@/assets/icons/envelope.svg" alt=""> {{ email }}
                    </li>
                </ul>

                <div v-if="employee.voivodeships">
                    <p class="font-medium">{{ $t('pages.contact.voievodship') }}:</p>
                    <p>{{ employee.voivodeships?.join(', ') }}</p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import type { IContactEmployee } from '~/types/contact';

const props = defineProps({
    employees: Array<IContactEmployee>,
})
const { employees } = props;
</script>