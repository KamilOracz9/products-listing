import type { IMobileHeaderMenu, IMobileHeaderMenuItem } from '~/types';

type IGlobalStore = {
    menuIsOpen: boolean;
    submenu: string;
    mobileHeaderMenu: IMobileHeaderMenu
}

export const useHeaderStore = defineStore('header', {
    state: (): IGlobalStore => ({
        menuIsOpen: false,
        submenu: '',
        mobileHeaderMenu: {
            isLoading: false,
            items: [],
        },
    }),
    actions: {
        toggleMenuIsOpen(): void {
            this.menuIsOpen = !this.menuIsOpen;
            const body = document.querySelector('body');

            this.menuIsOpen
                ? body?.classList.add('overflow-hidden')
                : body?.classList.remove('overflow-hidden');
        },
        setSubmenu(name: string): void {
            this.submenu = this.submenu === name ? '' : name;
        },
        async fetchMobileMenuItems(): Promise<void> {
            this.mobileHeaderMenu.isLoading = true;

            await import('@/data/mobileHeaderMenu').then(response => {
                this.mobileHeaderMenu.items = <IMobileHeaderMenuItem[]>response.default;
            }).finally(() => this.mobileHeaderMenu.isLoading = false)
        }
    }
});