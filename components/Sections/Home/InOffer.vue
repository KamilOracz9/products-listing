<template>
    <section class="bg-gray-2 px-10 py-6 mt-7 h-fit sm:text-[1.25rem] sm:leading-6">
        <h6 class="font-bold text-lg leading-6 mb-2 sm:text-xl">W naszej ofercie znajdziesz wiele kolorów okuć kabiny:</h6>

        <ul class="pl-8">
            <li class="list-disc" v-for="color in homeStore.inOffer.colors">
                <NuxtLink :to="color.url">{{ color.title }}</NuxtLink>
            </li>
        </ul>

        <h6 class="font-bold text-lg leading-6 mt-10 mb-2 sm:text-xl">Masz również ogromny wybór wariantów w kolekcjach:</h6>

        <ul>
            <li v-for="collection in homeStore.inOffer.collections" class="mb-6">
                <NuxtLink class="flex gap-2 font-bold" :to="collection.url"><img src="@/assets/icons/arrow.svg" class="-rotate-90" alt=""> {{ collection.title }}</NuxtLink>
                <ul class="pl-8 mt-2">
                    <li class="list-disc" v-for="category in collection.categories">
                        <NuxtLink :to="category.url">{{ category.title }}</NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>

<script setup>
    const homeStore = useHomeStore();
</script>

<!-- <section class="description typo-20 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
    <h6><strong>W naszej ofercie znajdziesz wiele kolorów okuć kabiny:</strong></h6>
<ul>
<li><a href="https://newtrendy.pl/produkty/?kolor=czarny">Czarny</a></li>
<li><a href="https://newtrendy.pl/produkty/?kolor=bialy">Biały</a></li>
<li><a href="https://newtrendy.pl/produkty/?kolor=chrom">Chrom</a></li>
<li><a href="https://newtrendy.pl/produkty/?kolor=czarny-chrom">Czarny Chrom</a></li>
<li><a href="https://newtrendy.pl/produkty/?kolor=zloty">Złoty</a></li>
<li><a href="https://newtrendy.pl/produkty/?kolor=gunmetal">Gunmetal</a></li>
<li><a href="https://newtrendy.pl/produkty/?kolor=miedziany">Miedziany</a></li>
</ul>
<p>&nbsp;</p>
<h6><strong>Masz również ogromny wybór wariantów w kolekcjach:</strong></h6>
<p><a href="https://newtrendy.pl/kategoria-produktu/kabiny-walk-in/"><img decoding="async" loading="lazy" class="alignnone wp-image-38211" src="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png" alt="" width="15" height="15" srcset="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png 512w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-150x150.png 150w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-247x247.png 247w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-404x404.png 404w" sizes="(max-width: 15px) 100vw, 15px"> &nbsp; </a><strong><a href="https://newtrendy.pl/kategoria-produktu/kabiny-walk-in/">Walk In</a></strong></p>
<p><a href="https://newtrendy.pl/kategoria-produktu/kabiny-walk-in/"><img decoding="async" loading="lazy" class="alignnone wp-image-38211" src="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png" alt="" width="15" height="15" srcset="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png 512w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-150x150.png 150w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-247x247.png 247w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-404x404.png 404w" sizes="(max-width: 15px) 100vw, 15px"> &nbsp; </a><strong><a href="https://newtrendy.pl/kategoria-produktu/drzwi-wnekowe/">Drzwi wnękowe</a></strong></p>
<ul>
<li><a href="https://newtrendy.pl/kategoria-produktu/drzwi-wnekowe/?typ=drzwi-otwierane-na-zewnatrz">Drzwi prysznicowe otwierane na zewnątrz</a></li>
<li><a href="https://newtrendy.pl/kategoria-produktu/drzwi-wnekowe/?typ=drzwi-przesuwne">Drzwi prysznicowe przesuwne</a></li>
<li><a href="https://newtrendy.pl/kategoria-produktu/drzwi-wnekowe/?typ=drzwi-wahadlowe">Drzwi prysznicowe wahadłowe</a></li>
<li><a href="https://newtrendy.pl/kategoria-produktu/drzwi-wnekowe/?typ=drzwi-skladane">Drzwi prysznicowe składane</a></li>
</ul>
<p><a href="https://newtrendy.pl/kategoria-produktu/kabiny-walk-in/"><img decoding="async" loading="lazy" class="alignnone wp-image-38211" src="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png" alt="" width="15" height="15" srcset="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png 512w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-150x150.png 150w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-247x247.png 247w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-404x404.png 404w" sizes="(max-width: 15px) 100vw, 15px"> &nbsp; </a><strong><a href="https://newtrendy.pl/kategoria-produktu/kabiny-prysznicowe/">Kabiny prysznicowe</a></strong></p>
<ul>
<li><a href="https://newtrendy.pl/kategoria-produktu/kabiny-prysznicowe/?typ=kwadratowe-prostokatne">Kabiny kwadratowe/ kabiny prostokątne</a></li>
<li><a href="https://newtrendy.pl/kategoria-produktu/kabiny-prysznicowe/?typ=pieciokatne">Kabiny pięciokątne</a></li>
<li><a href="https://newtrendy.pl/kategoria-produktu/kabiny-prysznicowe/?typ=polokragle">Kabiny półokrągłe</a></li>
<li><a href="https://newtrendy.pl/kategoria-produktu/kabiny-prysznicowe/?typ=przyscienne">Kabiny przyścienne</a></li>
</ul>
<p><a href="https://newtrendy.pl/kategoria-produktu/kabiny-walk-in/"><img decoding="async" loading="lazy" class="alignnone wp-image-38211" src="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png" alt="" width="15" height="15" srcset="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png 512w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-150x150.png 150w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-247x247.png 247w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-404x404.png 404w" sizes="(max-width: 15px) 100vw, 15px"> &nbsp; </a><strong><a href="https://newtrendy.pl/kategoria-produktu/parawany-nawannowe/">Parawany nawannowe</a></strong></p>
<p><a href="https://newtrendy.pl/kategoria-produktu/kabiny-walk-in/"><img decoding="async" loading="lazy" class="alignnone wp-image-38211" src="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png" alt="" width="15" height="15" srcset="https://newtrendy.pl/app/uploads/2023/08/right-arrow.png 512w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-150x150.png 150w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-247x247.png 247w, https://newtrendy.pl/app/uploads/2023/08/right-arrow-404x404.png 404w" sizes="(max-width: 15px) 100vw, 15px"> &nbsp; </a><strong><a href="https://newtrendy.pl/kategoria-produktu/brodziki-i-odwodnienia/">Brodziki</a></strong></p>
<ul>
<li><a href="https://newtrendy.pl/kategoria-produktu/brodziki-i-odwodnienia/?typ=brodziki-brodziki-i-odwodnienia&amp;brodzik=konglomeratowe-brodziki-brodziki-i-odwodnienia">Brodziki konglomeratowe</a></li>
<li><a href="https://newtrendy.pl/kategoria-produktu/brodziki-i-odwodnienia/?typ=brodziki-brodziki-i-odwodnienia&amp;brodzik=akrylowe-brodziki-brodziki-i-odwodnienia">Brodziki akrylowe</a></li>
</ul>
</section> -->