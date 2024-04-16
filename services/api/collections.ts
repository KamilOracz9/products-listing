import type { Collection } from "~/types/layout.types";
import { getLocaleIso } from "~/utils"

export const fetchCollections = async (): Promise<Collection[]> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/collections`));
