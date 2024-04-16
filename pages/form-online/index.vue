<template>
    <form id="form-online" class="grid grid-col gap-10" @submit="onSubmit">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
        <h1 class="section-title">{{ title }}</h1>
        <div v-html="section_1.html" class="section-text lg:w-1/2"></div>

        <div class="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div class="content-grid">
                <h2>{{ $t('pages.form-online.form-person.title') }}</h2>

                <InputFloating name="name" type="text" :label="$t('pages.form-online.form-person.placeholders.name')" />
                <ValidationError :messages="formResponse.errors.name" />
                <InputFloating name="street" type="text"
                    :label="$t('pages.form-online.form-person.placeholders.street')" />
                <ValidationError :messages="formResponse.errors.street" />
                <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputFloating name="home_number" type="text"
                            :label="$t('pages.form-online.form-person.placeholders.home')" />
                        <ValidationError :messages="formResponse.errors.home_number" />
                    </div>
                    <div>
                        <InputFloating name="post_code" type="text"
                            :label="$t('pages.form-online.form-person.placeholders.zip-code')" />
                        <ValidationError :messages="formResponse.errors.post_code" />
                    </div>
                </div>
                <InputFloating name="city" type="text" :label="$t('pages.form-online.form-person.placeholders.city')" />
                <ValidationError :messages="formResponse.errors.city" />
                <div class="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputFloating name="phone" type="text"
                            :label="$t('pages.form-online.form-person.placeholders.phone')" />
                        <ValidationError :messages="formResponse.errors.phone" />
                    </div>
                    <div>
                        <InputFloating name="email" type="text"
                            :label="$t('pages.form-online.form-person.placeholders.email')" />
                        <ValidationError :messages="formResponse.errors.email" />
                    </div>
                </div>
                <InputFloating name="description" type="textarea"
                    :label="$t('pages.form-online.form-person.placeholders.desc')" />
                <ValidationError :messages="formResponse.errors.description" />
            </div>
            <div class="content-grid">
                <h2>{{ $t('pages.form-online.form-product.title') }}</h2>

                <InputFloating name="product_name" type="text"
                    :label="$t('pages.form-online.form-product.placeholders.name')" />
                <ValidationError :messages="formResponse.errors.product_name" />
                <InputFloating name="number" type="text"
                    :label="$t('pages.form-online.form-product.placeholders.number')" />
                <ValidationError :messages="formResponse.errors.number" />
                <InputFloating name="place" type="text"
                    :label="$t('pages.form-online.form-product.placeholders.place')" />
                <ValidationError :messages="formResponse.errors.place" />

                <div class="relative file-input border-b border-gray-1 pb-4">
                    <input name="image" accept="image/png, image/jpeg"
                        @change="fileName = (<HTMLInputElement>$event?.target)?.files[0]?.name" ref="fileInputRef"
                        class="invisible h-0 w-0 absolute" type="file">

                    <div class="flex w-fit items-center gap-6 flex-wrap [&>button]:w-fit">
                        <label>{{ $t('pages.form-online.form-product.add-photo') }}</label>
                        <ButtonsFilled :label="$t('pages.form-online.form-product.select-file')" type="button"
                            @click="<HTMLInputElement>fileInputRef.click()" tagType="button" color="yellow-2" />
                        <p>{{ fileName ?? $t('pages.form-online.form-product.no-file') }}</p>
                    </div>
                </div>
                <ValidationError :messages="formResponse.errors.image" />

                <div class="flex gap-6 actions flex-col xs:flex-row">
                    <p>{{ $t('pages.form-online.form-product.action') }}</p>
                    <div class="flex gap-3 text-xs">
                        <input name="action" type="checkbox" value="on"
                            class="border border-black w-4 h-4 text-black focus:ring-0" id="warranty" />
                        <label class="" for="warranty">{{ $t('pages.form-online.form-product.warranty') }}</label>
                    </div>

                    <div class="flex gap-3 text-xs">
                        <input name="action" type="checkbox" value="off"
                            class="border border-black w-4 h-4 text-black focus:ring-0" id="post-warranty" />
                        <label class="" for="post-warranty">{{ $t('pages.form-online.form-product.post-warranty')
                            }}</label>
                    </div>
                </div>
                <ValidationError :messages="formResponse.errors.action" />
            </div>
        </div>

        <div class="mb-10 grid gap-6 lg:w-1/2">
            <div v-html="section_2.hmtl" class="[font-size:_clamp(.75rem,1cqw,.875rem)] leading-[1.2]"></div>

            <div class="grid gap-6">
                <div class="flex gap-3 text-xs">
                    <input type="checkbox" name="true_data" class="border border-black w-4 h-4 text-black focus:ring-0"
                        id="real-data" />
                    <label class="" for="real-data">{{ section_3.checkbox_1 }}</label>
                </div>
                <ValidationError :messages="formResponse.errors.true_data" />

                <div class="flex gap-3 text-xs">
                    <input name="clausue" type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0"
                        id="processing-data" />
                    <label class="" for="processing-data">{{ section_3.checkbox_2 }}</label>
                </div>
                <ValidationError :messages="formResponse.errors.clausue" />
            </div>

            <div class="w-fit">
                <ButtonsFilled :label="$t('send')" type="submit" tagType="button" color="yellow-2" />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { SERVICE_FORM_INITIAL_RESPONSE } from '~/constants/form';
import { DataKeys } from '~/enums/dataKeys';
import { Types } from '~/enums/flashMessage';
import { sendServiceMessage } from '~/services/api';
import { fetchFormOnlinePage } from '~/services/api/form-online';
import type { FormOnlinePage } from '~/types/form-online.types';

const flashMessages = useFlashMessageStore();

const fileInputRef = ref();
const fileName = ref();
const formResponse = ref({ ...SERVICE_FORM_INITIAL_RESPONSE });

const onSubmit = async (event: Event) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;

    const formData = new FormData(form);

    const data = await sendServiceMessage(formData);

    if (data.errors) formResponse.value.errors = data.errors;
    else {
        formResponse.value.errors = { ...SERVICE_FORM_INITIAL_RESPONSE.errors };
        formResponse.value.message = data.message;

        form.reset();

        flashMessages.addMessage({
            message: data.message,
            type: Types.SUCCESS
        });
    };
}

const { data } = await useAsyncData(DataKeys.FORM_ONLINE_PAGE, () => fetchFormOnlinePage());
const { breadcrumbs, description, meta, title } = toRefs(data.value as FormOnlinePage);
const { section_1, section_2, section_3 } = toRefs(description.value.content);
</script>