<template>
    <div class="row modifications">
        <div class="column">
            <h2><img :src="plusIcon" width="30" height="30" alt=""> Modyfikuj wymiary</h2>
            <p>Coraz częściej zdarza się, że strefa prysznica posiada wymiary odbiegające od standardowych,
                dostępnych od ręki. Przy pomocy naszego Konfiguratora Kabin możemy modyfikować dowolny wymiar
                produktu z dokładnością do 1 mm. Możemy zmienić wysokość kabiny lub na przykład zaprojektować kabinę
                (drzwi wnękowe) na całą szerokość łazienki, zaznaczając przy okazji umiejscowienie drzwi, aby nie
                wchodziły w konflikt z innych elementami wyposażenia łazienki. Na koniec konfiguracji od razu
                poznamy cenę katalogową planowanego rozwiązania.</p>
            <div class="flex flex-col gap-4 xs:flex-row">
                <a href="#menu"
                    class="w-full min-h-[30px] xs:min-h-[56px] border border-black xs:aspect-[auto_1/1] grid place-items-center">
                    <Arrow :direction="'upper'" :width="20" />
                </a>
                <ButtonsTransparent tag-type="link" :label="$t('pages.made-to-measure.configurator')"
                    url="http://konfiguratorkabin.pl/" />
            </div>
        </div>

        <img src="https://newtrendy.pl/app/uploads/2023/07/eventa_na_wymiar4.jpg" alt=""
            class="column max-h-[400px] w-full object-cover lg:max-h-auto" :class="imgClass">
    </div>
</template>

<script setup lang="ts">
const plusIcon = 'https://newtrendy.pl/app/uploads/2023/07/krzyzyk.jpg';

const props = withDefaults(defineProps<{
    imgClass?: string;
}>(), {})

const { imgClass } = toRefs(props);

</script>

<style lang="css" scoped>
@import url('@/assets/css/made-to-measure.css');
</style>