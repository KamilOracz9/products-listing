<template>
    <section id="form-online" class="grid grid-col gap-10">
        <SectionsCommonBreadrumbs :breadcrumbs="breadcrumbs" />
        <h1 class="section-title">{{ $t('pages.form-online.title') }}</h1>
        <div v-html="text" class="section-text lg:w-1/2"></div>

        <div class="grid gap-6 lg:grid-cols-2 lg:gap-10">
            <div class="content-grid">
                <h2>{{ $t('pages.form-online.form-person.title') }}</h2>

                <InputFloating name="name" type="text" :label="$t('pages.form-online.form-person.placeholders.name')" />
                <InputFloating name="street" type="text" :label="$t('pages.form-online.form-person.placeholders.street')" />
                <div class="grid gap-4 sm:grid-cols-2">
                    <InputFloating name="home-number" type="text"
                        :label="$t('pages.form-online.form-person.placeholders.home')" />
                    <InputFloating name="zip-code" type="text"
                        :label="$t('pages.form-online.form-person.placeholders.zip-code')" />
                </div>
                <InputFloating name="city" type="text" :label="$t('pages.form-online.form-person.placeholders.city')" />
                <div class="grid gap-4 sm:grid-cols-2">
                    <InputFloating name="phone" type="text"
                        :label="$t('pages.form-online.form-person.placeholders.phone')" />
                    <InputFloating name="email" type="text"
                        :label="$t('pages.form-online.form-person.placeholders.email')" />
                </div>
                <InputFloating name="description" type="textarea"
                    :label="$t('pages.form-online.form-person.placeholders.desc')" />
            </div>
            <div class="content-grid">
                <h2>{{ $t('pages.form-online.form-product.title') }}</h2>

                <InputFloating name="product_name" type="text"
                    :label="$t('pages.form-online.form-product.placeholders.name')" />
                <InputFloating name="product_number" type="text"
                    :label="$t('pages.form-online.form-product.placeholders.number')" />
                <InputFloating name="product_place" type="text"
                    :label="$t('pages.form-online.form-product.placeholders.place')" />

                <div class="relative file-input border-b border-gray-1 pb-4">
                    <input accept="image/png, image/jpeg"
                        @change="fileName = (<HTMLInputElement>$event?.target)?.files[0]?.name" ref="fileInputRef"
                        class="invisible h-0 w-0 absolute" type="file">

                    <div class="flex w-fit items-center gap-6 flex-wrap [&>button]:w-fit">
                        <label>{{ $t('pages.form-online.form-product.add-photo') }}</label>
                        <ButtonsFilled :label="$t('pages.form-online.form-product.select-file')" type="button"
                            @click="<HTMLInputElement>fileInputRef.click()" tagType="button" color="yellow-2" />
                        <p>{{ fileName ?? $t('pages.form-online.form-product.no-file') }}</p>
                    </div>
                </div>

                <div class="flex gap-6 actions flex-col xs:flex-row">
                    <p>{{ $t('pages.form-online.form-product.action') }}</p>
                    <div class="flex gap-3 text-xs">
                        <input type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0" id="warranty" />
                        <label class="" for="warranty">{{ $t('pages.form-online.form-product.warranty') }}</label>
                    </div>
                    <div class="flex gap-3 text-xs">
                        <input type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0" id="post-warranty" />
                        <label class="" for="post-warranty">{{ $t('pages.form-online.form-product.post-warranty') }}</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-10 grid gap-6 lg:w-1/2">
            <div v-html="clausue" class="[font-size:_clamp(.75rem,1cqw,.875rem)] leading-[1.2]"></div>

            <div class="grid gap-6">
                <div class="flex gap-3 text-xs">
                    <input type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0" id="real-data" />
                    <label class="" for="real-data">{{ $t('pages.form-online.form-person.statements.real-data') }}</label>
                </div>

                <div class="flex gap-3 text-xs">
                    <input type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0"
                        id="processing-data" />
                    <label class="" for="processing-data">{{ $t('pages.form-online.form-person.statements.processing-data')
                    }}</label>
                </div>
            </div>

            <div class="w-fit">
                <ButtonsFilled :label="$t('send')" type="submit" tagType="button" color="yellow-2" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const formOnlineStore = useFormOnlineStore();

const { breadcrumbs, text, clausue } = toRefs(useFormOnlineStore());
const fileInputRef = ref();
const fileName = ref();

onMounted(async () => {
    await formOnlineStore.fetchData();
})
</script>