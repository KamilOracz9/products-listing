<style>
:root{
    --container-height: calc(100vh - 8rem);
}

.container {
    @apply flex flex-wrap gap-6 min-w-full;

    height: var(--container-height);
}

.image-wrapper {
    @apply flex-shrink-0 h-64 flex justify-center items-center w-full md:flex-1;

    &>img {
        @apply max-h-full max-w-full object-contain;
    }
}

.scrollable-list-wrapper {
    @apply flex-shrink-0 w-full md:w-1/2;

    height: calc(100% - 16rem - 11rem);

    /* @media screen and (min-width: 768px) {
        height: 500px;
        
    } */

    &>ul {
        @apply text-xs flex flex-col gap-2 overflow-y-auto pr-2;

        height: 100%; 
        max-height: 100%;

        &>li {
            @apply flex items-center gap-2 justify-between flex-shrink-0;
        }
    }
}

.footer {
    @apply h-max flex flex-col items-center justify-center gap-4 w-full md:flex-row;

    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
}

.confirm-button {
    @apply px-4 h-14 flex items-center justify-center w-full bg-black text-white rounded md:max-w-[200px];
}
</style>

<template>
    <UiDialog :is-open="showDialog" @close="handleClose">
        <template #message>
            <div class="container" :class="!pending ? '' : 'hidden'">
                <!-- Fixed header section -->
                <div class="image-wrapper">
                    <img :src="defaultImage" alt="">
                </div>

                <!-- Scrollable middle section -->
                <div class="scrollable-list-wrapper">
                    <ul>
                        <li v-for="part in partsList" :key="part.name">
                            <p class="flex-1">{{ part.name }}</p>
                            <input type="checkbox" :value="part.mar_uuid" class="flex-shrink-0">
                        </li>
                    </ul>
                </div>

                <!-- Fixed footer section -->
                <div class="footer">
                    <InputFloating type="text" :label="$t('pages.product.email-label')" id="request_email" name="request_email"
                        class="w-full" />
                    <button @click="handleConfirm" class="confirm-button">{{ $t('pages.product.send-request') }}</button>
                </div>
            </div>
            <div class="flex items-center justify-center h-full" :class="!pending ? 'hidden' : ''">
                <LoadingIndicator />
            </div>
        </template>
    </UiDialog>
</template>

<script setup lang="ts">
import type { Variant } from '~/types/products.types';

interface Props {
    showDialog: boolean;
    defaultImage?: string;
    partsList: Variant['parts_catalog'];
}

interface Emits {
    (e: 'close'): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localeIso = ref(getLocaleIso());
const pending = ref(false);

const handleClose = () => {
    emit('close')
}

const handleConfirm = () => {
    const selectedParts = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedIds: string[] = Array.from(selectedParts).map((el) => (el as HTMLInputElement).value);
    const parts = props.partsList
        .filter(part => selectedIds.includes(part.mar_uuid))
        .map(({ mar_uuid, bom_uuid }) => ({ mar_uuid, bom_uuid }));

    const emailInput = document.getElementById('request_email') as HTMLInputElement;

    pending.value = true;

    fetch(`${useAppConfig().public.apiBase}/v2/${localeIso.value}/products/parts-catalog/form`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            request_email: emailInput.value,
            items: parts,
        }),
    })
        .then(request => {
            if (request.ok) {
                selectedParts.forEach(part => {
                    (part as HTMLInputElement).checked = false;
                });

                emailInput.value = '';

                emit('close')
            }
        })
        .finally(() => {
            pending.value = false;
        });
}
</script>