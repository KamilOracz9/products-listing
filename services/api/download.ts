import type { DownloadPage } from "~/types/download.types";

export const fetchDownloadPage = async (locale: string): Promise<DownloadPage> => (await $fetch(`${useAppConfig().public.apiBase}/v2/${locale}/cms/download`));
export const fetchDownload3DPage = async (locale: string): Promise<DownloadPage> => (await $fetch(`${useAppConfig().public.apiBase}/v1/${locale}/cms/page/download/3d`));
export const fetchDownloadDocumentsPage = async (locale: string): Promise<DownloadPage> => (await $fetch(`${useAppConfig().public.apiBase}/v2/${locale}/cms/download/declarations`));
