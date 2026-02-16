export const usePlaceToBuyStore = () => {
  const state = reactive({
    allLocations: [] as any[],
    visibleLocationIds: [] as number[],
    displayedLocations: [] as any[],
    mapZoom: 6,
    isFiltering: false
  });

  const updateVisibleLocations = (visibleIds: number[]) => {
    state.visibleLocationIds = [...visibleIds];
    updateDisplayedLocations();
  };

  const updateDisplayedLocations = () => {
    if (state.mapZoom <= 6 || state.visibleLocationIds.length === 0) {
      state.displayedLocations = [...state.allLocations];
      state.isFiltering = false;
    } else {
      state.displayedLocations = state.allLocations.filter(
        location => state.visibleLocationIds.includes(location.id)
      );
      state.isFiltering = true;
    }
  };

  const setAllLocations = (locations: any[]) => {
    state.allLocations = [...locations];
    updateDisplayedLocations();
  };

  const addLocations = (locations: any[]) => {
    const existingIds = new Set(state.allLocations.map(loc => loc.id));
    const newLocations = locations.filter(loc => !existingIds.has(loc.id));
    state.allLocations = [...state.allLocations, ...newLocations];
    updateDisplayedLocations();
  };

  const setMapZoom = (zoom: number) => {
    state.mapZoom = zoom;
    updateDisplayedLocations();
  };

  const reset = () => {
    state.allLocations = [];
    state.visibleLocationIds = [];
    state.displayedLocations = [];
    state.mapZoom = 6;
    state.isFiltering = false;
  };

  return {
    state: readonly(state),
    updateVisibleLocations,
    setAllLocations,
    addLocations,
    setMapZoom,
    reset
  };
};
