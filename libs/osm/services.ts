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
        default: return 'black';
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