<template>
    <div id="made-to-measure" class="[&_a]:border-black [&_a]:xs:w-fit [&_a]:h-fit">
        <h1 class="section-title">{{ $t('pages.made-to-measure.title') }}</h1>

        <div class="content-grid">
            <div class="row">
                <div class="column">
                    <h2>Granice są po to, aby je przekraczać…</h2>
                    <p>To motto, które w pełni odzwierciedla aktualne trendy w aranżacji łazienek. Przestrzeń, w której
                        główną
                        rolę
                        odgrywa komfort Klienta, powinna być połączeniem ergonomii oraz estetyki. Osiągnięcie takiej
                        harmonii to
                        jedno z największych wyzwań, z jakim mierzą się projektanci i architekci. Personalizacja łazienki, w
                        tym
                        strefy prysznica, to doskonałe rozwiązanie, które pozwala stworzyć niepowtarzalny projekt. Dział
                        produktów
                        na wymiar powstał, aby zrealizować każdy z nich.</p>
                    <img src="https://newtrendy.pl/app/uploads/2023/08/na_wymiar2.svg" width="500" height="152"
                        class="aspect-[auto_500/152] mx-auto" alt="">
                    <h2>STWÓRZ WŁASNĄ KABINĘ PRYSZNICOWĄ NA WYMIAR</h2>
                    <p>Z powodzeniem realizujemy nietypowe projekty, które zagościły już w wielu łazienkach. Jeżeli chcesz,
                        aby
                        jeden z nich pojawił się również w Twojej, wejdź na <a
                            href="konfiguratorkabin.pl">konfiguratorkabin.pl</a> i stwórz
                        kabinę
                        prysznicową
                        dokładnie taką, jakiej potrzebujesz!</p>
                    <ButtonsTransparent tag-type="link" :label="$t('pages.made-to-measure.configurator')"
                        url="http://konfiguratorkabin.pl/" />
                    <ButtonsTransparent tag-type="link" :label="$t('pages.made-to-measure.how-use')"
                        url="https://www.youtube.com/watch?v=MDWW0YDOjw8" />
                </div>
                <img src="https://newtrendy.pl/app/uploads/2023/07/kobieta_laptop.jpg"
                    class="column rounded-tr-lg md:max-h-[400px] lg:max-h-full lg:h-full w-full object-cover" alt="">
            </div>

            <div class="row">
                <div class="column">
                    <p class="![font-size:_clamp(1.25rem,2cqw,1.625rem)] leading-[1.1] font-extrabold">Zapoznaj
                        się z
                        niniejszym opisem, jeśli potrzebujesz nietypowej kabiny, która powinna zostać zwymiarowana przez
                        naszych
                        Certyfikowanych instalatorów.</p>
                    <p class="![font-size:_clamp(1.25rem,2cqw,1.5rem)] text-yellow-1 mt-4 leading-[1.1] font-medium">
                        „Od
                        pomiaru do realizacji zamówienia – krok po kroku”</p>
                </div>
            </div>

            <div class="row instruction divider">
                <div class="column" v-for="index in 7" data-aos="fade-up" :data-aos-delay="index * 100">
                    <img width="80" height="80" src="https://newtrendy.pl/app/uploads/2023/12/01_zglos_pomiar_ikona.svg"
                        alt="">
                    <h3>1. ZGŁOŚ POMIAR</h3>
                    <p>Aby zgłosić chęć pomiaru, napisz do nas maila (<a
                            href="mailto:nawymiar@newtrendy.pl">nawymiar@newtrendy.pl</a>), ze wskazaniem dokładnego adresu
                        pomiaru wraz z telefonem kontaktowym.</p>
                </div>
            </div>

            <div id="#menu" class="row menu divider">
                <div class="column">
                    <h2>Możliwe modyfikacje w naszych produktach:</h2>
                    <h3 v-for="index in 7" data-aos="fade-up" :data-aos-delay="index * 100">
                        <NuxtLink aria-label="Wymiar" class=""><img :src="plusIcon" width="20" height="20" alt="">Wymiar
                        </NuxtLink>
                    </h3>
                </div>
            </div>

            <SectionsMadeToMeasureModification imgClass="rounded-bl-md md:rounded-bl-lg" />

            <div class="row modifications" data-aos="fade-up">
                <div class="column col-span-2">
                    <h2><img :src="plusIcon" width="30" height="30" alt=""> Modyfikuj kształt</h2>
                    <p>Coraz częściej zdarza się, że strefa prysznica posiada wymiary odbiegające od standardowych,
                        dostępnych od ręki. Przy pomocy naszego Konfiguratora Kabin możemy modyfikować dowolny wymiar
                        produktu z dokładnością do 1 mm. Możemy zmienić wysokość kabiny lub na przykład zaprojektować kabinę
                        (drzwi wnękowe) na całą szerokość łazienki, zaznaczając przy okazji umiejscowienie drzwi, aby nie
                        wchodziły w konflikt z innych elementami wyposażenia łazienki. Na koniec konfiguracji od razu
                        poznamy cenę katalogową planowanego rozwiązania.</p>
                    <div class="flex flex-col gap-4 xs:flex-row">
                        <a href="#menu"
                            class="transparent-button p-0 w-full min-h-[30px] xs:min-h-[56px] border border-black xs:aspect-[auto_1/1] grid place-items-center">
                            <Arrow :direction="'upper'" :width="20" />
                        </a>
                        <ButtonsTransparent tag-type="link" :label="$t('pages.made-to-measure.configurator')"
                            url="http://konfiguratorkabin.pl/" />
                    </div>
                </div>
            </div>

            <div class="row">
                <img src="https://newtrendy.pl/app/uploads/2023/07/eventa_na_wymiar4.jpg" alt=""
                    class="column max-h-[400px] w-full object-cover lg:max-h-auto rounded-tl-md md:rounded-tl-lg">
                <img src="https://newtrendy.pl/app/uploads/2023/07/eventa_na_wymiar4.jpg" alt=""
                    class="column max-h-[400px] w-full object-cover lg:max-h-auto rounded-br-md md:rounded-br-lg">
            </div>
            <div class="row tech-pictures">
                <img v-for="index in 6" data-aos="fade-up" :data-aos-delay="index * 100" src="https://newtrendy.pl/app/uploads/2023/08/Rysunek-02.jpg" alt="" class="column">
            </div>

            <SectionsMadeToMeasureModification imgClass="rounded-tl-md md:rounded-tl-lg" />
            <SectionsMadeToMeasureModification />
            <SectionsMadeToMeasureModification imgClass="rounded-br-md md:rounded-br-lg" />
            <SectionsMadeToMeasureModification />

            <div class="row modifications" data-aos="fade-up">
                <div class="column col-span-2">
                    <h2><img :src="plusIcon" width="30" height="30" alt=""> Zmień szkło</h2>
                    <p>Coraz częściej zdarza się, że strefa prysznica posiada wymiary odbiegające od standardowych,
                        dostępnych od ręki. Przy pomocy naszego Konfiguratora Kabin możemy modyfikować dowolny wymiar
                        produktu z dokładnością do 1 mm. Możemy zmienić wysokość kabiny lub na przykład zaprojektować kabinę
                        (drzwi wnękowe) na całą szerokość łazienki, zaznaczając przy okazji umiejscowienie drzwi, aby nie
                        wchodziły w konflikt z innych elementami wyposażenia łazienki. Na koniec konfiguracji od razu
                        poznamy cenę katalogową planowanego rozwiązania.</p>
                    <div class="flex flex-col gap-4 xs:flex-row">
                        <a href="#menu"
                            class="transparent-button p-0 w-full min-h-[30px] xs:min-h-[56px] border border-black xs:aspect-[auto_1/1] grid place-items-center">
                            <Arrow :direction="'upper'" :width="20" />
                        </a>
                        <ButtonsTransparent tag-type="link" :label="$t('pages.made-to-measure.configurator')"
                            url="http://konfiguratorkabin.pl/" />
                    </div>
                </div>
            </div>

            <div class="row glasses mb-10">
                <div class="column" v-for="index in 8" data-aos="fade-up">
                    <img src="https://newtrendy.pl/app/uploads/2023/07/opti_clear.jpg" alt="">
                    <p>
                        Wysoka transparentność szkła znakomicie prezentuje się w aranżacji łazienek z minimalistyczną strefą
                        prysznica. Idealnie sprawdza się w przypadku kabin typu walk in. Przeszklenia OptiClear pozbawione
                        są zielonkawego odcienia, które może być widoczne w przypadku standardowych, transparentnych szyb.
                    </p>
                    <table>
                        <thead>
                            <th>Symbol</th>
                            <th>Szkło</th>
                        </thead>
                        <tbody>
                            <tr><td>S16</td><td>6mm</td></tr>
                            <tr><td>S18</td><td>8mm</td></tr>
                            <tr><td>S10</td><td>10mm</td></tr>
                        </tbody>
                    </table>

                    <div class="flex justify-between">
                        <p class="uppercase font-medium">POZIOM PRZEZROCZYSTOŚCI</p>
                        <div class="flex gap-1 items-center stars">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png" width="20" height="20" alt="">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png" width="20" height="20" alt="">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png" width="20" height="20" alt="">
                            <img src="http://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_50na50-1.png" width="20" height="20" alt="">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_szara-1.png" width="20" height="20" alt="">
                        </div>
                    </div>
                    <div class="flex justify-between">
                        <p class="uppercase font-medium ![font-size:_clamp(.75rem,1cqw,1rem)]">POZIOM DYSKRECJI</p>
                        <div class="flex gap-1 items-center stars">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png" width="20" height="20" alt="">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png" width="20" height="20" alt="">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_zolta-1.png" width="20" height="20" alt="">
                            <img src="http://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_50na50-1.png" width="20" height="20" alt="">
                            <img src="https://techniczne.newtrendy.pl/wp-content/uploads/2021/09/gwiazdka_szara-1.png" width="20" height="20" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const plusIcon = 'https://newtrendy.pl/app/uploads/2023/07/krzyzyk.jpg';
</script>

<style lang="css" scoped>@import url('@/assets/css/made-to-measure.css');</style>