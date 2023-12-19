import type { IExpiredStatusId, IIcon, ILocation, ILocationType } from "~/types";

type PropsType = {
    counter: number,
    numbers: Array<string>,
    open: Ref<boolean>,
    location: ILocation;
};

export const getMarker = ({ counter, numbers, open, location }: PropsType) => {
    const markerSize = 25;
    const numbersElements = numbers.map(number => `<div>${number}</div>`);
    const styles = {
        display: open.value ? 'block' : 'none',
    };

    const mappedStyles = Object.keys(styles).map((key) => (`${key}: ${styles[key]}`)).join(';');

    return `
        <div class="marker" style="transform: translateY(-${markerSize}px); ">
            <div class="marker__data" style="${mappedStyles}">${numbersElements.join('')}</div>
            <div class="marker__counter">${counter}</div>
            ${icon({
                expiredStatusId: location.expired_status_id,
                locationType: location.type,
                markerSize: markerSize
            })}
        </div>
    `;
}

const color = (expiredStatusId: IExpiredStatusId) => {
    switch (expiredStatusId) {
        case 0: return 'green';
        case 1: return 'yellow';
        case 2: return 'red';
        default: 'black';
    }
}

export const icon = ({ expiredStatusId, locationType, markerSize }: IIcon) => {
    const { public: { expiredStatusesColors } } = useRuntimeConfig();

    switch (locationType) {
        case 'USE': return `
            <svg class="loaction-icon" width="${markerSize}" height="${markerSize}">
                <rect width="300" height="100" stroke="black" stroke-width=".5" fill="${expiredStatusesColors[color(expiredStatusId)]}"/>
            </svg>
        `;
        case 'ZSEU': return `
            <svg class="loaction-icon" height="${markerSize}" width="${markerSize}">
                <circle cx="${markerSize / 2}" cy="${markerSize / 2}" r="${markerSize / 2}" stroke="black" stroke-width=".5" fill="${expiredStatusesColors[color(expiredStatusId)]}" />
            </svg>
        `;
        default: return '';
    }
}

// <svg class="loaction-icon" xmlns="http://www.w3.org/2000/svg" height="${markerSize * 1.25}" width="${markerSize}" viewBox="0 0 384 512">
//                     <path fill="#1c59d4"
//                         d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
//                 </svg>