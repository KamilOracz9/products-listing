<template>
    <div class="grid-content">
        <section id="top-bar" class="bg-gray-2 flex h-[50px] items-center justify-between px-4 rounded-b-xl">
            <!-- Select -->
            <div class="cursor-pointer relative z-10" @click="toggle($el)" @mouseenter="toggle($el)"
                @mouseleave="toggle($el)">
                <span class="flex gap-2 ml-2 items-center leading-[25px] z-10 capitalize">
                    <span class="group-hover:animate-arrow-rotate-in">
                        <LazyArrow :width="10" :height="6" :direction="'down'" />
                    </span>

                    <div class="flex gap-2 items-center">
                        {{ $t(globalStore.locales.filter(({ code }) => code === $i18n.locale)[0].label.toLowerCase()) }}
                        <img height="12" width="18"
                            :src="`/assets/langs/${$i18n.locale}.svg`"
                            :alt="`Choosen language ${$i18n.locale}`" :title="`Choosen language ${$i18n.locale}`" />
                    </div>
                </span>

                <ClientOnly>
                    <ul
                        class="absolute border border-gray-2 top-full flex-col bg-white min-w-[140px] invisible group-hover:visible group-hover:animate-fade-in">
                        <li v-for="item in globalStore.locales">
                            <button v-if="isWebsiteEu || (!isWebsiteEu && (item.code === 'pl' || item.code === 'en'))" type="button" @click="changeLanguage(item.code)"
                                class="p-3 flex items-center gap-2 group/dropdown-item">
                                <img height="12" width="18" :src="`/assets/langs/${item.code}.svg`" :alt="item.code" :title="item.code" />
                                <span class="transition-opacity group-hover/dropdown-item:opacity-[70%] capitalize">{{
                                    $t(item.label.toLowerCase()) }}</span>
                            </button>
                        </li>
                    </ul>
                </ClientOnly>
            </div>

            <!-- Icons -->
            <div class="text-gray-1 hidden gap-[14px] items-center lg:flex">
                <NuxtLink :to="localePath({ name: 'privacy-policy' }) + '/'" :aria-label="$t('privacy-policy')"
                    class="mr-2 text-black opacity-[70%] transition-all hover-opacity-60">{{ $t('privacy-policy') }}
                </NuxtLink>
                <a :href="globalStore.socials.facebook" target="_blank" aria-label="Facebook"><img class="top-bar-icon"
                        src="@/assets/icons/social/facebook.svg" width="10" height="20" alt="Facebook" title="Facebook" /></a>
                <a :href="globalStore.socials.instagram" target="_blank" aria-label="Instagram"><img class="top-bar-icon"
                        src="@/assets/icons/social/instagram.svg" width="19" height="18" alt="Instagram" title="Instagram" /></a>
                <a :href="globalStore.socials.pinterest" target="_blank" aria-label="Pinterest"><img class="top-bar-icon"
                        src="@/assets/icons/social/pinterest.svg" width="19" height="20" alt="Pinterest" title="Pinterest" /></a>
                <a :href="globalStore.socials.youtube" target="_blank" aria-label="Youtube"><img class="top-bar-icon"
                        src="@/assets/icons/social/youtube.svg" width="23" height="16" alt="Youtube" title="Youtube" /></a>
                <a :href="globalStore.socials.linkedin" target="_blank" aria-label="Linkedin"><img class="top-bar-icon"
                        src="@/assets/icons/social/linkedin.svg" width="21" height="20" alt="Linkedin" title="Linkedin" /></a>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import device from '~/plugins/device';
import { useGlobalStore } from '~/stores';

const setIsRefreshing = inject('setIsRefreshing');

const { setLocale } = useI18n();
const localePath = useLocalePath();
const globalStore = useGlobalStore();

const open = ref(false);
const isMobile = device().provide.isMobile();

const changeLanguage = async (lang: string) => {
    await setIsRefreshing();
    await setLocale(lang);

    window.location = window.location.href.split('?')[0];
}

const isWebsiteEu = computed(() => (useRequestURL().host !== 'newtrendy.newtrendy.usermd.net' && useRequestURL().host !== 'localhost:3001'));

console.log(isWebsiteEu.value)

function toggle(element: HTMLElement) {
    const eventType = (<Event>event).type;

    if (isMobile && eventType === 'click') open.value = !open.value;
    else if (!isMobile && eventType !== 'click') open.value = eventType === 'mouseenter';

    open.value ? element.classList.add('group') : element.classList.remove('group');
}
</script>