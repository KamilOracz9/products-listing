export type IProductFilter = {
    label: string;
    key: string;
    enableSearching: boolean;
    inputs: IProductFilterInput[];
}

export type IProductFilterDimensions = {
    width: {
        min: number;
        max: number;
        enable: boolean;
    },
    depth: {
        min: number;
        max: number;
        enable: boolean;
    },
    height: {
        min: number;
        max: number;
        enable: boolean;
    },
}

type IProductFilterInput = {
    label: string;
    value: number;
    enable: boolean;
}