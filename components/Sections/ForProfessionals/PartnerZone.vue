<template>
    <section class="mb-20" :id="slugify($t('partner-zone'))">
        <p class="section-title">{{ partnerZone.title }}</p>

        <section class="for-professionas-section">
            <div v-html="partnerZone.section1.text" class="section-text lg:my-0" data-aos="fade-up"></div>

            <div class="mt-6 lg:mt-0" data-aos="fade-up">
                <p class="font-medium text-xl sm:text-2xl">{{ partnerZone.section2.title }}</p>

                <div v-html="partnerZone.section2.text" class="section-text my-2 lg:my-4"></div>
            </div>
        </section>

        <section class="for-professionas-section">
            <SectionsCommonBox boxClass="bg-yellow-2" :box="partnerZone.section3.boxLeft" />
            <SectionsCommonBox boxClass="bg-gray-5 rounded-tr-[25px] mt-6 md:rounded-tr-lg lg:mt-0"
                :box="partnerZone.section3.boxRight" />
        </section>

        <section class="for-professionas-section">
            <SectionsForProfessionalsPartnerZoneImage :image="partnerZone.section4.imageLeft" />
            <SectionsForProfessionalsPartnerZoneImage :image="partnerZone.section4.imageRight" />
        </section>
    </section>
</template>

<script setup>
import slugify from '~/plugins/slugify';

const forProfessionalStore = inject('forProfessionalStore');
const partnerZone = forProfessionalStore.partnerZone;
</script>
