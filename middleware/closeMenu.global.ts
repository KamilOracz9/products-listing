import device from "~/plugins/device";

export default defineNuxtRouteMiddleware(to => {
    if (process.server) return;

    // const background = document.getElementById('menu-background');
    const body = document.querySelector('body');

    body?.classList.remove('overflow-hidden');

    // if(!background) return;

    const headerStore = useHeaderStore();
    
    // if(device().provide.isDesktop()) 
    headerStore.submenu = '';

    // background.style.height = '0';

    headerStore.menuIsOpen = false;
})