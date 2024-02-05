<template>
    <section id="top-bar" class="bg-gray-5 hidden h-[50px] items-center justify-between px-4 rounded-b-xl xs:flex">
        <!-- Select -->
        <div class="cursor-pointer relative z-10" @click="toggle($el)" @mouseenter="toggle($el)"
            @mouseleave="toggle($el, false)">
            <span class="flex gap-2 ml-2 items-center leading-[25px] z-10">
                <span class="group-hover:animate-arrow-rotate-in">
                    <img src="@/assets/icons/arrow.svg" width="10" alt="">
                </span>

                {{ $t(globalStore.locale.locales.filter(({ code }) => code === locale)[0].label.toLowerCase()) }}
            </span>

            <ul
                class="absolute border border-gray-2 top-full flex-col bg-white min-w-[140px] invisible group-hover:visible group-hover:animate-fade-in">
                <li class="p-3" v-for="item in globalStore.locale.locales">
                    <div @click="setLocale(item.code)" class="flex gap-2 group/dropdown-item">
                        <img width="18" :src="item.flagUrl" alt="">
                        <span class="transition-opacity group-hover/dropdown-item:opacity-[70%]">{{ $t(item.label.toLowerCase()) }}</span>
                    </div>
                </li>
            </ul>
        </div>

        <!-- Icons -->
        <div class="text-gray-1 flex gap-[14px] items-center">
            <a href="/" class="mr-2 text-black opacity-[50%] transition-all hover-opacity-60">{{ $t('privacy-policy') }}</a>
            <a href="/"><img class="top-bar-icon" src="@/assets/icons/social/facebook.svg" width="10" height="20"
                    alt=""></a>
            <a href="/"><img class="top-bar-icon" src="@/assets/icons/social/instagram.svg" width="19" height="18"
                    alt=""></a>
            <a href="/"><img class="top-bar-icon" src="@/assets/icons/social/pinterest.svg" width="19" height="20"
                    alt=""></a>
            <a href="/"><img class="top-bar-icon" src="@/assets/icons/social/youtube.svg" width="23" height="16" alt=""></a>
            <a href="/"><img class="top-bar-icon" src="@/assets/icons/social/linkedin.svg" width="21" height="20"
                    alt=""></a>
        </div>
    </section>
</template>

<script setup>
import device from '@/plugins/device';
import { useGlobalStore } from '@/stores';

const globalStore = useGlobalStore();
const { locale, setLocale } = useI18n();

const open = ref(false);
const isMobile = device().provide.isMobile();

function toggle(element) {
    const eventType = event.type;

    if (isMobile && eventType === 'click') open.value = !open.value;
    else if(!isMobile && eventType !== 'click') open.value = eventType === 'mouseenter';

    open.value ? element.classList.add('group') : element.classList.remove('group');
}
</script>