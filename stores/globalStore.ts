type IGlobalStore = {
    groupedMode: boolean;
    dataOpen: boolean;
}

export const useGlobalStore = defineStore('global', {
    state: (): IGlobalStore => ({
        groupedMode: true,
        dataOpen: false,
    }),
    actions: {
        closeAllData() {
            this.dataOpen = false;

            document.querySelectorAll('.marker__data').forEach((element) => {
                (<HTMLElement>element).style.display = 'none';
            });
        },
        showAllData() {
            this.dataOpen = true;

            document.querySelectorAll('.marker__data').forEach((element) => {
                (<HTMLElement>element).style.display = 'block';
            });
        },
    }
});