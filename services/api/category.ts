import type { CategoryPage } from "~/types/category.types";

export const fetchCategoryPage = async (categoryId: number): Promise<CategoryPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/category/${categoryId}`));