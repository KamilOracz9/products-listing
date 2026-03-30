<template>
  <div class="flex">
    <section>
      <div>
        <div class="mt-10 flex gap-10">
          <SectionsProductsSidebar />
          <div class="w-full">
            <template v-if="variants">
              <div>
                <SectionsProductsListing :products="filteredProducts" />
              </div>
            </template>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const query = {
  // category: 'kabiny-prysznicowe',
}

const filters = await $fetch(`http://localhost:8000/api/newtrendy/v3/pl_PL/variants/filters`, { query })
const variants = await $fetch(`http://localhost:8000/api/newtrendy/v3/pl_PL/variants`, { query })

// console.log(filters.filters['seria'].find())

const filteredProductsIds = computed(() => {
  return new Set(Object.entries(route.query).map(([key, values]) => {
    const paramName = key.replace('[]', '');

    values = Array.isArray(values) ? values : [values];

    return filters.filters[paramName].filter(option => values.includes(option.value)).map(({ products }) => products).flat();
  }));
});

// console.log(filteredProductsIds.value.values().every(values => values.includes(14)));

const filteredProducts = computed(() => filteredProductsIds.value.size ? variants?.filter(variant => filteredProductsIds.value.values().every(values => values.includes(variant.product_id))) : variants);

const options = new Set(filteredProducts.value.flatMap(product => product.options));
const availableOptions = new Set(variants.filter(variant => variant.options.some(option => options.has(option))).flatMap(product => product.options));

// console.log(filteredProducts.value, variants.filter(variant => variant.options.some(option => options.has(option))));

// console.log(availableOptions, Object.entries(filters.filters).map(([key, options]) => ([key, options.products.some(productId => filteredProductsIds.value.has(productId))])));

// console.log(filters.filters['seria'][0].products.some(productId => filteredProductsIds.value.has(productId)));
console.log(filters.filters['seria'][2].products.filter(productId => filteredProductsIds.value.values().next().value.includes(productId)));

// console.log(filteredProductsIds.value.values().next().value.includes(48))

provide('filtersData', filters);
provide('filteredProductsIds', filteredProductsIds);
</script>