import type { DownloadPage } from "~/types/download.types";
import { getLocaleIso } from "~/utils"

export const fetchDownload = async (): Promise<DownloadPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/download`));
export const fetchDownload3D = async (): Promise<DownloadPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${getLocaleIso.value}/cms/page/download/3d`));
