import type { IBreadCrumb, IPhoto } from "."

export type IForProfessionalsPartnerZone = {
    title: string;
    section1: {
        text: string;
    };
    section2: {
        title: string;
        text: string;
    };
    section3: {
        boxLeft: {
            title: string;
            text: string;
            buttonText: string;
            path: string;
        };
        boxRight: {
            title: string;
            text: string;
            buttonText: string;
            path: string;
        };
    };
    section4: {
        imageLeft: IPhoto;
        imageRight: IPhoto;
    };
}

export type IForProfessionalsArchitectZone = {
    title: string;
    section1: {
        text: string;
    };
    section2: {
        title: string;
        text: string;
    };
    section3: {
        title: string;
        list: string[];
        contact: {
            phone: string;
            email: string;
        };
    };
    section4: {
        image: IPhoto;
        title: string;
        path: string;
        buttonText: string;
    };
    section5: {
        boxLeft: {
            title: string;
            text: string;
            buttonText: string;
            path: string;
        };
        boxRight: {
            title: string;
            text: string;
            buttonText: string;
            path: string;
        };
    };
    section6: {
        boxLeft: {
            title: string;
            image: string;
            path: string;
        };
        boxRight: {
            title: string;
            image: string;
            path: string;
        };
    };
}