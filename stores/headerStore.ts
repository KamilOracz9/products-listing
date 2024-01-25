import { concat } from 'lodash';
import type { IHeaderMenuCategory, IHeaderMenuItem } from '~/types';

type IHeaderStore = {
    menuIsOpen: boolean;
    submenu: string;
    headerMenu: {
        isLoading: boolean;
        items: IHeaderMenuItem[];
        categories: {
            columns: IHeaderMenuCategory[];
        };
    };
}

const useHeaderStore = defineStore('header', {
    state: (): IHeaderStore => ({
        menuIsOpen: false,
        submenu: '',
        headerMenu: {
            isLoading: true,
            items: [],
            categories: {
                columns: [],
            },
        },
    }),
    getters: {
        mainCategories: state => {
            const categories = state.headerMenu.categories.columns
                .map(column => column.items
                    .map(({ label, url, slug, iconUrl }) => ({ label, url, slug, iconUrl }))
                )

            return concat(...categories);
        },
        columnsNumber: state => (state.headerMenu.categories.columns.length),
    },
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
        async fetchMenuItems(i18n): Promise<void> {
            this.headerMenu.isLoading = true;

            await import('@/data/headerMenu').then(response => {
                this.headerMenu.items = <IHeaderMenuItem[]>response.default.items.filter(item => !['clipboard', 'products', 'download', 'search'].includes(item.slug));

                this.headerMenu.items.unshift({
                    label: i18n.t('products'),
                    slug: 'products',
                    type: 'products',
                    items: response.default.categories
                });
                this.headerMenu.items.push({
                    label: i18n.t('download'),
                    slug: 'download',
                    type: 'download',
                    items: []
                });
                this.headerMenu.items.push({
                    label: i18n.t('search'),
                    slug: 'search',
                    type: 'search',
                    items: []
                });
                this.headerMenu.items.push({
                    label: i18n.t('clipboard'),
                    slug: 'clipboard',
                    type: 'clipboard',
                    items: []
                });
                this.headerMenu.categories = <{ columns: IHeaderMenuCategory[] }>response.default.categories;
            }).finally(() => this.headerMenu.isLoading = false)
        }
    }
});

export default useHeaderStore;