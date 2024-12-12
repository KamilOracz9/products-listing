import type { InspirationCategoriesPage, InspirationPage, InspirationCategoryPage } from "~/types/inspirations.types";
import { getLocaleIso } from "~/utils";

export const fetchInspirationPage = async (slug: string): Promise<InspirationPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/articles/show/${slug}`));
export const fetchInspirationCategoriesPage = async (): Promise<InspirationCategoriesPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/articles`));
export const fetchInspirationCategoryPage = async (slug: string): Promise<InspirationCategoryPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso()}/cms/page/articles/category/${slug}`));