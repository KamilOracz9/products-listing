import type { IHeaderMenu, IHeaderMenuCategory, IHeaderMenuItem } from '~/types';

type IHeaderStore = {
    menuIsOpen: boolean;
    submenu: string;
    headerMenu: IHeaderMenu;
}

export const useHeaderStore = defineStore('header', {
    state: (): IHeaderStore => ({
        menuIsOpen: false,
        submenu: '',
        headerMenu: {
            isLoading: false,
            items: [],
            categories: [],
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
        setSubmenu(name: string, isMobile: boolean = true): void {
            this.submenu = (this.submenu === name && isMobile) ? '' : name;
        },
        async fetchMenuItems(): Promise<void> {
            this.headerMenu.isLoading = true;

            await import('@/data/mobileHeaderMenu').then(response => {
                this.headerMenu.items = <IHeaderMenuItem[]>response.default.items;
                this.headerMenu.items.unshift({
                    label: 'Produkty',
                    slug: 'produkty',
                    iconUrl: '',
                    url: '/',
                    type: 'products',
                    items: response.default.categories
                });
                this.headerMenu.items.push({
                    label: 'Pobierz',
                    slug: 'pobierz',
                    iconUrl: '',
                    url: '/',
                    type: 'download',
                    items: []
                });
                this.headerMenu.items.push({
                    label: 'Wyszukaj',
                    slug: 'szukaj',
                    iconUrl: '',
                    url: '/',
                    type: 'search',
                    items: []
                });
                this.headerMenu.items.push({
                    label: 'Schowek',
                    slug: 'schowek',
                    iconUrl: '',
                    url: '/',
                    type: 'clipboard',
                    items: []
                });
                this.headerMenu.categories = <IHeaderMenuCategory[]>response.default.categories;
            }).finally(() => this.headerMenu.isLoading = false)
        }
    }
});