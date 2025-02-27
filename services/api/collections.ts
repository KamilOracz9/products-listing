import type { Collection } from "~/types/layout.types";

export const fetchCollections = async (locale: string): Promise<Collection[]> => (await $fetch(`${useAppConfig().public.apiBase}/v2/${locale}/collections`));
