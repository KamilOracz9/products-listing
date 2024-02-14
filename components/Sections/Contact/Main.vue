<template>
    <section>
        <p class="section-title">{{ main.title }}</p>

        <div class="lg:grid lg:grid-cols-2 lg:gap-10 xl:grid-cols-5">
            <div class="flex flex-col gap-6 [&>div>p>span]:font-bold sm:text-lg">
                <div>
                    <p><span>{{ $t('pages.contact.address') }}:</span> {{ main.contact.address }}</p>
                    <p><span>{{ $t('pages.contact.phone') }}:</span> <a :href="`tel:${main.contact.phone}`">{{
                        main.contact.phone }}</a></p>
                    <p><a :href="`mailto:${main.contact.email}`">{{ main.contact.email }}</a></p>
                </div>

                <div>
                    <p><span>{{ main.contact.gps }}</span></p>
                </div>

                <a :href="main.contact.map.url">
                    <img :src="main.contact.map.image" class="w-[200px] h-[50px]" width="200" height="50" alt="">
                </a>

                <div>
                    <p><span>NIP:</span> {{ main.numbers.nip }}</p>
                    <p><span>KRS:</span> {{ main.numbers.krs }}</p>
                    <p><span>REGON:</span> {{ main.numbers.regon }}</p>
                </div>

                <div>
                    <p><span>{{ $t('pages.contact.logistic-centrum') }}</span></p>
                    <p>{{ main.logisticCentrum.address }}</p>
                </div>
            </div>

            <picture class="block my-6 lg:m-0 self-start xl:col-span-2">
                <source media="(min-width: 640)" :srcset="main.image.tablet">
                <img :src="main.image.mobile" class="w-full h-full object-contain rounded-tl-[25px] 2xl:rounded-tl-lg"
                    alt="">
            </picture>

            <div class="flex flex-col gap-4 lg:col-span-2 xl:col-span-2">
                <p class="uppercase font-medium text-xl">{{ $t('pages.contact.form.write-to-us') }}</p>

                <InputFloating type="text" id="name" name="name" :label="$t('pages.contact.form.name-and-surname')" />
                <InputFloating type="text" id="email" name="email" :label="$t('pages.contact.form.email-address')" />
                <InputFloating type="textarea" id="message" name="message" :label="$t('pages.contact.form.message')" />

                <div class="text-xs sm:text-sm">
                    <p>
                        {{ $t('pages.contact.form.agreement') }}
                        <NuxtLink class="font-bold">{{ $t('pages.contact.form.privacy') }}</NuxtLink>
                        {{ $t('pages.contact.form.and') }}
                        <NuxtLink class="font-bold">{{ $t('pages.contact.form.info-clausue') }}</NuxtLink>
                    </p>

                    <div class="mt-4">
                        <input type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0" id="agreement" />
                        <label class="ml-2" for="agreement">{{ $t('pages.contact.form.accept') }}</label>
                    </div>
                </div>

                <div class="w-fit ml-auto">
                    <ButtonsFilled type="button" tagType="button" :label="$t('pages.contact.form.send')"
                        :onClick="() => console.log('asd')" color="yellow-2" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const contactStore = inject('contactStore');
const { main } = contactStore;
</script>