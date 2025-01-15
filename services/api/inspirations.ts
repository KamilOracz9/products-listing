import type { InspirationCategoriesPage, InspirationPage, InspirationCategoryPage } from "~/types/inspirations.types";

export const fetchInspirationPage = async (slug: string, locale: string): Promise<InspirationPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/articles/show/${slug}`));
export const fetchInspirationCategoriesPage = async (locale: string): Promise<InspirationCategoriesPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/articles`));
export const fetchInspirationCategoryPage = async (slug: string, locale: string): Promise<InspirationCategoryPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/articles/category/${slug}`));
