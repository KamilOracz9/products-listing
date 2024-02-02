<template>
    <NuxtLink :to="social.url">
        <img :src="icons[social.type]" class="h-4" alt="">
    </NuxtLink>
</template>

<script setup>
import facebookIcon from '@/assets/icons/social/facebook.svg';
import instagramIcon from '@/assets/icons/social/instagram.svg';
import linkedinIcon from '@/assets/icons/social/linkedin.svg';
import youtubeIcon from '@/assets/icons/social/youtube.svg';
import pinterestIcon from '@/assets/icons/social/pinterest.svg';

const props = defineProps(['social']);

const { social } = props;
const icons = {
    facebook: facebookIcon,
    instagram: instagramIcon,
    linkedin: linkedinIcon,
    youtube: youtubeIcon,
    pinterest: pinterestIcon,
}
</script>