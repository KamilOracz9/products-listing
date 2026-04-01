<style>
.parts-container {
    --button-height: min(2.5rem, 5vh);
    --buttons-height: calc(3 * var(--button-height) + 4rem);
    --image-height: min(16rem, 30%);
    --list-height: calc(100% - var(--image-height) - var(--buttons-height) - var(--title-height));
    --container-height: calc(100vh - 8rem);
    --title-height: calc(50px);

    @apply flex flex-wrap gap-6 min-w-full;

    height: var(--container-height);
    max-width: 1000px;

    @media screen and (min-width: 768px) {
        --buttons-height: calc(var(--button-height) + 2rem);
        --image-height: calc(100% - var(--buttons-height) - var(--title-height));
        --list-height: calc(100% - var(--buttons-height) - var(--title-height));
    }

    @media screen and (min-height: 768px) {
        --container-height: 600px;
    }

    .title {
        @apply font-medium text-lg w-full flex items-center justify-between;
    }

    .image-wrapper {
        @apply flex-shrink-0 flex justify-center items-center w-full md:flex-1;

        height: var(--image-height);

        &>img {
            @apply max-h-full max-w-full object-contain;
        }
    }

    .scrollable-list-wrapper {
        @apply flex-shrink-0 w-full md:w-1/2;

        height: var(--list-height);

        &>ul {
            @apply text-xs flex flex-col overflow-y-auto pr-2 md:text-sm;

            height: 100%;
            max-height: 100%;

            &>li {
                @apply flex items-center gap-2 justify-between flex-shrink-0 px-2 py-1 cursor-pointer;

                &>input[type="checkbox"] {
                    @apply flex-shrink-0 border border-black w-4 h-4 text-black rounded focus:ring-0;
                }
            }

            &>li:nth-child(odd) {
                @apply bg-gray-2;
            }
        }
    }

    .footer {
        @apply h-max flex flex-col items-center justify-center gap-2 w-full md:flex-row;

        &>input {
            @apply px-4 flex items-center justify-center w-full rounded;

            height: var(--button-height);

            &:focus {
                @apply outline-none ring-0 border-black;
            }
        }

        &>.confirm-button {
            @apply px-4 flex items-center justify-center w-full bg-black text-white rounded md:max-w-[200px];

            height: var(--button-height);
        }
    }

    .loader {
        @apply items-center justify-center h-full w-full absolute top-0 left-0 bg-white z-10;
    }
}
</style>

<template>
    <UiDialog :is-open="showDialog" @close="handleClose">
        <template #message>
            <div class="parts-container">
                <!-- Fixed title section -->
                <div class="title">
                    <p>{{ t('pages.product.parts-catalog-title') }}: {{ productSymbol }}</p>
                    <button @click="handleClose">
                        <img src="~/assets/icons/close.svg" width="16" height="16" alt="">
                    </button>
                </div>

                <!-- Fixed image section -->
                <div class="image-wrapper">
                    <img :src="image ?? defaultImage" alt="">
                </div>

                <!-- Scrollable middle section -->
                <div class="scrollable-list-wrapper">
                    <ul>
                        <li @click="handleSetImage(part.media)" v-for="part in partsList" :key="part.name">
                            <p class="flex-1">{{ part.name }}</p>
                            <input type="checkbox" :value="part.mar_uuid" @click.stop>
                        </li>
                    </ul>
                </div>

                <!-- Fixed footer section -->
                <div class="footer">
                    <input type="email" :placeholder="t('pages.product.email-label')" id="request_email"
                        name="request_email" class="" />
                    <p class="hidden md:block">{{ t('or') }}</p>
                    <input type="tel" :placeholder="t('pages.product.phone-label')" id="request_phone"
                        name="request_phone" class="" />
                    <button @click="handleConfirm" class="confirm-button">{{ t('pages.product.send-request')
                        }}</button>
                </div>

                <div class="loader" :class="pending ? 'flex' : 'hidden'">
                    <LoadingIndicator />
                </div>
            </div>
        </template>
    </UiDialog>
</template>

<script setup lang="ts">
import type { Variant } from '~/types/products.types';

const toast = useToast();

interface Props {
    showDialog: boolean;
    defaultImage?: string;
    partsList: Variant['parts_catalog'];
    productSymbol: string;
}

interface Emits {
    (e: 'close'): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localeIso = ref(getLocaleIso());
const pending = ref(false);
const image = ref<string | null>(props.defaultImage || null);
const { t } = useI18n();

const handleSetImage = (newImage?: string[]) => {
    if (newImage && newImage.length > 0) {
        image.value = newImage[0];
    } else {
        image.value = props.defaultImage || null;
    }
}

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
    const phoneInput = document.getElementById('request_phone') as HTMLInputElement;

    pending.value = true;

    fetch(`${useAppConfig().public.apiBase}/v2/${localeIso.value}/products/parts-catalog/form`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            request_email: emailInput.value,
            request_phone: phoneInput.value,
            items: parts,
        }),
    })
        .then(request => {
            if (request.ok) {
                selectedParts.forEach(part => {
                    (part as HTMLInputElement).checked = false;
                });

                emailInput.value = '';
                phoneInput.value = '';

                emit('close')

                toast.success({
                    message: t('pages.product.request-sent-success'),
                    timeout: 5000,
                })
            }
        })
        .finally(() => {
            pending.value = false;
        });
}
</script>