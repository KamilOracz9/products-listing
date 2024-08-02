const url = 'http://panel.newtrendy.pl';
const interval = 1000;

function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchDataValidationErrorRequests = ['pl_PL'].map(locale => (
    {
        locale: locale,
        requests: [
            { name: 'Fetch clipboard data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/products/clipboard`)).status).toBe(422) },
            { name: 'Fetch Voievodeships data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/location/voivodeships`)).status).toBe(422) },
            { name: 'Fetch Cities data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/location/cities`)).status).toBe(422) },
        ]
    }
));

const fetchDataRequests = ['pl_PL', 'en_US', 'de_DE', 'sk_SK', 'ro_RO', 'uk_UA'].map(locale => (
    {
        locale: locale,
        requests: [
            { name: 'Fetch Layout data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/layout?site_id=1`)).status).toBe(200) },
            { name: 'Fetch About Us page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/about-us`)).status).toBe(200) },
            { name: 'Fetch Catgory undefined page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/category`)).status).toBe(200) },
            { name: 'Fetch Catgory page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/category/kabiny-prysznicowe`)).status).toBe(200) },
            { name: 'Fetch Clipboard data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/products/clipboard?ids[]=1`)).status).toBe(200) },
            { name: 'Fetch Collections page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/collections`)).status).toBe(200) },
            { name: 'Fetch Contact page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/contact`)).status).toBe(200) },
            { name: 'Fetch Download page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/download`)).status).toBe(200) },
            { name: 'Fetch Download 3d page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/download/3d`)).status).toBe(200) },
            { name: 'Fetch Filters data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/products/filters`)).status).toBe(200) },
            { name: 'Fetch For Professionals page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/for-professionals`)).status).toBe(200) },
            { name: 'Fetch Form Online page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/form-online`)).status).toBe(200) },
            { name: 'Fetch Home page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/home`)).status).toBe(200) },
            { name: 'Fetch Information Clausue page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/information-clause`)).status).toBe(200) },
            { name: 'Fetch Article page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/articles/show/katalog-produktow-new-trendy-2023-de_DE`)).status).toBe(200) },
            { name: 'Fetch Articles page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/articles`)).status).toBe(200) },
            { name: 'Fetch Articles Category page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/articles/category/inspirationen`)).status).toBe(200) },
            { name: 'Fetch Voievodeships data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/location/voivodeships?search=maz`)).status).toBe(200) },
            { name: 'Fetch Cities data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/location/cities?search=rad`)).status).toBe(200) },
            { name: 'Fetch Made To Measure page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/made-to-measure`)).status).toBe(200) },
            { name: 'Fetch Places To Buy page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/place-to-buy/shops-list`)).status).toBe(200) },
            { name: 'Fetch Coords List data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/place-to-buy/coords-list`)).status).toBe(200) },
            { name: 'Fetch Privacy Policy data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/privacy-policy`)).status).toBe(200) },
            { name: 'Fetch Products data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/products`)).status).toBe(200) },
            { name: 'Fetch Product page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/products/eventa-recessed-door-single-with-additional-wall`)).status).toBe(200) },
            { name: 'Fetch Search page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/search`, { method: 'POST' })).status).toBe(200) },
            { name: 'Fetch Service page data', fetch: async () => expect((await fetch(`${url}/api/v1/${locale}/cms/page/service`)).status).toBe(200) },
        ]
    }
));

[fetchDataValidationErrorRequests, fetchDataRequests].forEach(fetchTest => {
    fetchTest.forEach(({ locale, requests }) => {
        describe(`Fetch data validation error in ${locale}`, () => {
            requests.forEach(({ name, fetch }) => {
                test(name, async () => {
                    await wait(interval);
                    await fetch();
                });
            });
        });
    });
    
})