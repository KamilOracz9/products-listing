export type IProductFilter = {
    label: string;
    key: string;
    enableSearching: boolean;
    inputs: IProductFilterInput[];
}

export type IProductFilterDimensions = {
    width: {
        label: string;
        min: number;
        max: number;
        enable: boolean;
    },
    depth: {
        label: string;
        min: number;
        max: number;
        enable: boolean;
    },
    height: {
        label: string;
        min: number;
        max: number;
        enable: boolean;
    },
}

export type IProductFilterInput = {
    label: string;
    value: number;
    enable: boolean;
}