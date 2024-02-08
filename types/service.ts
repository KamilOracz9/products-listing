import type { IPhoto } from ".";

export type IServiceSections = {
    section1: IServiceSection1;
    section2: IServiceSection2;
    section3: IServiceSection3;
    section4: IServiceSection4;
    section5: IServiceSection5;
}

export type IServiceSection1 = {
    text: string;
}

export type IServiceSection2 = {
    title: string;
    text: string;
}

export type IServiceSection3 = {
    left:{
        items: {
            title: string;
            phones: string[];
            hours: {
                open: number;
                close: number;
            },
        }[]
    };
    right: {
        image: IPhoto;
    }
}

export type IServiceSection4 = {
    boxLeft: {
        title: string;
        text: string;
        options: {
            value: string;
            label: string;
        }[];
    };
    boxRight: {
        title: string;
        text: string;
        buttonText: string;
        path: string;
    }
}

export type IServiceSection5 = {
    cities: {
        label: string;
        contacts: {
            name: string;
            phone: string;
        }[];
    }[];
    reklamationsForm: {
        title: string;
        text: string;
        buttons: {
            buttonText: string;
            path: string;
        }[];
    }
}