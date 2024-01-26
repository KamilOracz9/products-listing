export default defineNuxtRouteMiddleware(to => {
    if (process.server) return;

    const background = document.getElementById('menu-background');

    if(!background) return;

    const headerStore = useHeaderStore();
    
    headerStore.submenu = '';

    background.style.height = '0'
})