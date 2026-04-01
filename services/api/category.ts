import type { CategoryPage } from "~/types/category.types";

// export const fetchCategoryPage = async (slug: string, locale: string, fetchFn: typeof $fetch = $fetch): Promise<CategoryPage> => (await fetchFn(`http://localhost:8000/api/v1/pl_PL/cms/page/category/kabiny-prysznicowe`));
export const fetchCategoryPage = async (slug: string, locale: string, fetchFn: typeof $fetch = $fetch): Promise<CategoryPage> => (await fetchFn(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/category${slug ? `/${slug}` : ''}`));
