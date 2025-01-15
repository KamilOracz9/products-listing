import type { CategoryPage } from "~/types/category.types";

export const fetchCategoryPage = async (slug: string, locale: string): Promise<CategoryPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/category${slug ? `/${slug}` : ''}`));
