<template>
    <section :id="slugify($t('pages.contact.office'))">
        <p class="section-title">{{ title }}</p>

        <div class="lg:grid lg:grid-cols-2 lg:gap-10 xl:grid-cols-5">
            <div class="flex flex-col gap-6 sm:text-lg">
                <div data-aos="fade-up">
                    <p><span>ul:</span> {{ officeAddress }}</p>
                    <p><span>{{ $t('pages.contact.phone') }}:</span> <a :href="`tel:${office.contact.phone}`">{{
                        office.contact.phone }}</a></p>
                    <p><a :href="`mailto:${office.contact.email}`">{{ office.contact.email }}</a></p>
                </div>

                <div data-aos="fade-up">
                    <p class="font-medium"><span>{{ office.address.gps }}</span></p>
                </div>

                <a href="https://www.google.com/maps/place/New+Trendy+Sp.+z+o.o./@51.3789493,21.078195,17z/data=!4m6!3m5!1s0x47185969fe0bb7d9:0xe64e431891bc9fa4!8m2!3d51.3789493!4d21.0807699!16s%2Fg%2F1q675dmtz?entry=tts&shorturl=1" target="_blank" data-aos="fade-up">
                    <img src="/assets/images/contact_map_button.png" class="w-[200px] h-[50px]" width="200" height="50" alt="">
                </a>

                <div data-aos="fade-up" class="[&>p>span]:font-bold">
                    <p v-for="number in office.numbers"><span>{{ number.label }}</span> {{ number.value }}</p>
                </div>

                <div data-aos="fade-up">
                    <p class="font-bold"><span>{{ $t('pages.contact.logistic-centrum') }}</span></p>
                    <p>{{ logisticAddress }}</p>
                </div>
            </div>

            <picture class="block my-6 lg:m-0 self-start xl:col-span-2" data-aos="fade-up">
                <source media="(min-width: 640)" :srcset="image">
                <img :src="image" class="w-full h-full object-contain rounded-tl-[25px] 2xl:rounded-tl-lg"
                    alt="">
            </picture>

            <div class="flex flex-col gap-4 lg:col-span-2 xl:col-span-2" data-aos="fade-up">
                <p class="uppercase font-medium text-xl">{{ $t('pages.contact.form.write-to-us') }}</p>

                <InputFloating type="text" id="name" name="name" :label="$t('pages.contact.form.name-and-surname')" />
                <InputFloating type="text" id="email" name="email" :label="$t('pages.contact.form.email-address')" />
                <InputFloating type="textarea" id="message" name="message" :label="$t('pages.contact.form.message')" />

                <div class="text-xs sm:text-sm">
                    <p>
                        {{ $t('pages.contact.form.agreement') }}
                        <NuxtLink :to="localePath({name: 'privacy-policy'})" class="font-bold">{{ $t('pages.contact.form.privacy') }}</NuxtLink>
                        {{ $t('pages.contact.form.and') }}
                        <NuxtLink :to="localePath({name: 'information-clausue'})" class="font-bold">{{ $t('pages.contact.form.info-clausue') }}</NuxtLink>
                    </p>

                    <div class="mt-4">
                        <input type="checkbox" class="border border-black w-4 h-4 text-black focus:ring-0"
                            id="agreement" />
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
import slugify from '~/plugins/slugify';

const props = defineProps(['data', 'title']);
const { data, title } = toRefs(props);
const { image, office, logistic } = toRefs(data.value);

const localePath = useLocalePath();

const officeAddress = computed(() => {
    const { city, postcode, street } = office.value.address;

    return `${street}, ${postcode} ${city}`
})

const logisticAddress = computed(() => {
    const { city, postcode, street } = logistic.value.address;

    return `${street}, ${postcode} ${city}`
})
</script>