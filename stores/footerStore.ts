type FooterState = {
    activeItem: string;
}

const useFooterStore = defineStore('footer', {
    state: (): FooterState => ({
        activeItem: '',
    }),
    actions: {
        setActiveItem(slug: string) {
            this.activeItem = this.activeItem === slug ? '' :  slug;
        },
        isActive(slug: string) {
            return this.activeItem === slug;
        },
    }
})

export default useFooterStore;