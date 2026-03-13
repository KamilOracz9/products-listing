<template>
  <section>
    <ProductsLayout :title="$t('products')">
    </ProductsLayout>
  </section>
</template>

<script setup lang="ts">
import ProductsLayout from '~/layouts/ProductsLayout.vue';

// import pages from '../../lang/pages.json';

// console.log(
//   Object.fromEntries(
//     Object.entries(pages).flatMap(([route, languages]) => {
//       const regex = /^(index|.*(products).*)$/

//       if (regex.test(route)) {
//         return Object.entries(languages).map(([language, data]) => {
//           return [`${(language !== 'pl' || route === 'index') ? '/' : ''}${language === 'pl' ? '' : language}${route === 'index' ? '' : data.body.static.replace(/\[.*?\]/g, "*")}`, { swr: true }];
//         })
//       }
//     }).filter(item => item)
//   )
// )

</script>