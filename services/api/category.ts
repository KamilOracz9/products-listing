import type { CategoryPage } from "~/types/category.types";

export const fetchCategoryPage = async (slug: string): Promise<CategoryPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/category/${slug}`));