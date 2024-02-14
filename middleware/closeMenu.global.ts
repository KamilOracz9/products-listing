import device from "~/plugins/device";

export default defineNuxtRouteMiddleware(to => {
    if (process.server) return;

    const background = document.getElementById('menu-background');

    if(!background) return;

    const headerStore = useHeaderStore();
    
    if(device().provide.isDesktop()) headerStore.submenu = '';

    background.style.height = '0';

    headerStore.menuIsOpen = false;
})