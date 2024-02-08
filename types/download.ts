export type IDownloadSection = {
    title: string;
    items: {
        icon: string;
        color: string;
        url: string;
        label: string;
    }[];
    button?: {
        buttonText: string;
        path: string;
    }
}