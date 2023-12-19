type PropsType = {
    markerSize: number,
    counter: number,
    numbers: Array<string>,
    open: Ref<boolean>
};

export const getMarker = ({ markerSize, counter, numbers, open }: PropsType) => {
    
    const numbersElements = numbers.map(number => `<div>${number}</div>`);
    const styles = {
        display: open.value ? 'block' : 'none',
    };

    const mappedStyles = Object.keys(styles).map(key => (`${key}: ${styles[key]}`)).join(';');

    return {
        'mapMarker': `
            <div class="marker" style="transform: translateY(-${markerSize}px); ">
                <div class="marker__data" style="${mappedStyles}">${numbersElements.join('')}</div>
                <div class="marker__counter">${counter}</div>
                <svg class="loaction-icon" xmlns="http://www.w3.org/2000/svg" height="${markerSize * 1.25}" width="${markerSize}" viewBox="0 0 384 512">
                    <path fill="#1c59d4"
                        d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
            </div>
        `,
    };
}