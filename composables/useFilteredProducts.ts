import _ from "lodash";
import type { LocationQuery } from "vue-router";

export const useFilteredProducts = (filtersData: Ref<any>, query: Ref<LocationQuery>) => {
    const filteredProductsIds = computed(() => {
      
      const allFilters = filtersData.value?.allFilters ?? [];
      const currentQuery = query.value;

      const activeFilters = Object.entries(currentQuery)
        .map(([key, values]) => {
          const paramName = key.replace('[]', '');
          const filterValues = Array.isArray(values) ? values : [values as string];

          return allFilters
            .filter((filter: any) => filterValues.includes(String(filter[paramName])))
            .map(({ product_id }: { product_id: number }) => product_id);
        })
        .filter(ids => ids.length > 0);

      if (!activeFilters.length) return [];

      return _.intersection(...activeFilters);
    });
  
    return { filteredProductsIds };
};