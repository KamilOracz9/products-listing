import type { InspirationCategoriesPage, InspirationPage, InspirationCategoryPage } from "~/types/inspirations.types";
import { getLocaleIso } from "~/utils";

export const fetchInspiration = async (slug: string): Promise<InspirationPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/articles/show/${slug}`));
export const fetchInspirationCategories = async (): Promise<InspirationCategoriesPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/articles`));
export const fetchInspirationCategory = async (slug: string): Promise<InspirationCategoryPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/articles/category/${slug}`));