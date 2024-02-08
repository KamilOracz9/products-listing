export default {
    breadcrumbs: [
        {
            label: 'Główna',
            path: '/',
        },
        {
            label: 'Serwis',
            path: '/serwis',
        },
    ],
    title: 'Serwis',
    sections: {
        section1: {
            text: '<p>Dział Serwisu odpowiada za fachowe doradztwo na każdym etapie oraz za serwis gwarancyjny i pogwarancyjny na terenie całego kraju. Nasi serwisanci dbają również o stałą dostępność części zamiennych.</p>',
        },
        section2: {
            title: 'Wybrałeś nasz produkt?',
            text: '<p>Skorzystaj z usług Certyfikowanych Instalatorów. Świetnie znają nasze produkty i dokonają dokładnego pomiaru. Korzystając z naszych rekomendacji masz gwarancję profesjonalnego montażu naszych produktów. Jeśli masz problem lub wątpliwości dotyczące naszych produktów zachęcamy do kontaktu z serwisem.</p>',
        },
        section3: {
            left: {
                items: [
                    {
                        title: 'Porady dotyczące montażu',
                        phones: ['505 063 221'],
                        hours: {
                            open: 8,
                            close: 18,
                        },
                    },
                    {
                        title: 'Części zamienne',
                        phones: ['505 908 199', '691 499 910'],
                        hours: {
                            open: 7,
                            close: 17,
                        },
                    },
                    {
                        title: 'Serwis',
                        phones: ['48 67 262 12 66', '508 106 021'],
                        hours: {
                            open: 8,
                            close: 16,
                        },
                    },
                ]
            },
            right: {
                image: {
                    mobile: 'https://newtrendy.pl/app/uploads/2023/07/instalator_400.jpg',
                    desktop: 'https://newtrendy.pl/app/uploads/2023/07/instalator_400.jpg',
                }
            },
        },
        section4: {
            boxLeft: {
                title: 'CERTYFIKOWANI INSTALATORZY',
                text: 'Korzystając z usług Certyfikowanych Instalatorów mają Państwo gwarancję profesjonalnego montażu naszych kabin',
                options: [
                    {
                        value: 'voi-1',
                        label: 'Pomorskie',
                    },
                    {
                        value: 'voi-2',
                        label: 'Mazowieckie',
                    },
                    {
                        value: 'voi-3',
                        label: 'Dolnośląskie',
                    },
                    {
                        value: 'voi-4',
                        label: 'Lubelskie',
                    },
                    {
                        value: 'voi-5',
                        label: 'Łódzkie',
                    },
                    {
                        value: 'voi-6',
                        label: 'Opolskie',
                    },
                    {
                        value: 'voi-7',
                        label: 'Podkarpackie',
                    },
                ],
            },
            boxRight: {
                title: 'CZĘŚCI ZAMIENNE',
                text: 'Serwis gwarancyjny i pogwarancyjny na terenie całego kraju oraz ciągła dostępność części zamiennych…',
                buttonText: 'Napisz do nas',
                path: '/',
            },
        },
        section5: {
            cities: [],
            reklamationsForm: {
                title: 'FORMULARZ REKLAMACYJNY',
                text: 'Aby dokładnie zapoznać się z zasadami i procedurami naszego serwisu zapoznaj się z naszą kartą gwarancyjną',
                buttons: [
                    {
                        buttonText: 'Karta gwarancyjna',
                        path: '/pobierz#dokumenty'
                    },
                    {
                        buttonText: 'Formularz online',
                        path: '/formularz-online'
                    },
                ]
            }
        }
    }
}

export const cities = [
    {
        label: 'Warszawa',
        contacts: [
            {
                name: 'Szymon Szczotka',
                phone: '887 333 343',
            },
            {
                name: 'Szymon Szczotka',
                phone: '887 333 343',
            },
        ],
    },
    {
        label: 'Ostrołęka',
        contacts: [
            {
                name: 'Szymon Szczotka',
                phone: '887 333 343',
            },
        ],
    },
]