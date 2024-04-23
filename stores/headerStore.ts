import type { IHeaderMenuItem } from '~/types/header';

type IHeaderStore = {
    menuIsOpen: boolean;
    submenu: string;
    headerMenu: {
        isLoading: boolean;
        items: IHeaderMenuItem[];
    };
}

const useHeaderStore = defineStore('header', {
    state: (): IHeaderStore => ({
        menuIsOpen: false,
        submenu: '',
        headerMenu: {
            isLoading: true,
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
        setSubmenu(name: string, isMobile: boolean = true): void {
            this.submenu = (this.submenu === name && isMobile) ? '' : name;
        },
    }
});

export default useHeaderStore;