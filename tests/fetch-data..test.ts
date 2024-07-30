describe('Fetch data in pl_PL', () => {
    describe("Fetch data success", () => {
        test('Fetch Layout data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/layout?site_id=1`)).status).toBe(200));
        test('Fetch About Us page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/about-us`)).status).toBe(200));
        test('Fetch Catgory undefined page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/category`)).status).toBe(200));
        test('Fetch Catgory page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/category/kabiny-prysznicowe`)).status).toBe(200));
        test('Fetch Clipboard data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/products/clipboard?ids[]=1`)).status).toBe(200));
        test('Fetch Collections page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/collections`)).status).toBe(200));
        test('Fetch Contact page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/contact`)).status).toBe(200));
        test('Fetch Download page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/download`)).status).toBe(200));
        test('Fetch Download 3d page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/download/3d`)).status).toBe(200));
        test('Fetch Filters data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/products/filters`)).status).toBe(200));
        test('Fetch For Professionals page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/for-professionals`)).status).toBe(200));
        test('Fetch Form Online page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/form-online`)).status).toBe(200));
        test('Fetch Home page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/home`)).status).toBe(200));
        test('Fetch Information Clausue page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/information-clause`)).status).toBe(200));
        test('Fetch Article page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/articles/show/katalog-produktow-new-trendy-2023`)).status).toBe(200));
        test('Fetch Articles page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/articles`)).status).toBe(200));
        test('Fetch Articles Category page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/articles/category/aktualnosci`)).status).toBe(200));
        test('Fetch Voievodeships data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/location/voivodeships?search=maz`)).status).toBe(200));
        test('Fetch Cities data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/location/cities?search=rad`)).status).toBe(200));
        test('Fetch Made To Measure page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/made-to-measure`)).status).toBe(200));
        test('Fetch Places To Buy page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/place-to-buy/shops-list`)).status).toBe(200));
        test('Fetch Coords List data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/place-to-buy/coords-list`)).status).toBe(200));
        test('Fetch Privacy Policy data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/privacy-policy`)).status).toBe(200));
        test('Fetch Products data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/products`)).status).toBe(200));
        test('Fetch Product page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/products/kabina-prysznicowa-walk-in-eventa-jednoelementowa-z-dodatkowa-scianka`)).status).toBe(200));
        test('Fetch Search page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/search`, { method: 'POST' })).status).toBe(200));
        test('Fetch Service page data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/cms/page/service`)).status).toBe(200));
    })

    describe("Fetch data validation error", () => {
        test('Fetch clipboard data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/products/clipboard`)).status).toBe(422));
        test('Fetch Voievodeships data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/location/voivodeships`)).status).toBe(422));
        test('Fetch Cities data', async () => expect((await fetch(`http://localhost:8000/api/v1/pl_PL/location/cities`)).status).toBe(422));
    })
})

// describe('Fetch data in en_US', () => {
//     describe("Fetch data success", () => {
//         test('Fetch Layout data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/layout?site_id=1`)).status).toBe(200));
//         test('Fetch About Us page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/about-us`)).status).toBe(200));
//         test('Fetch Catgory undefined page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/category`)).status).toBe(200));
//         test('Fetch Catgory page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/category/kabiny-prysznicowe`)).status).toBe(200));
//         test('Fetch Clipboard data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/products/clipboard?ids[]=1`)).status).toBe(200));
//         test('Fetch Collections page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/collections`)).status).toBe(200));
//         test('Fetch Contact page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/contact`)).status).toBe(200));
//         test('Fetch Download page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/download`)).status).toBe(200));
//         test('Fetch Download 3d page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/download/3d`)).status).toBe(200));
//         test('Fetch Filters data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/products/filters`)).status).toBe(200));
//         test('Fetch For Professionals page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/for-professionals`)).status).toBe(200));
//         test('Fetch Form Online page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/form-online`)).status).toBe(200));
//         test('Fetch Home page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/home`)).status).toBe(200));
//         test('Fetch Information Clausue page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/information-clause`)).status).toBe(200));
//         test('Fetch Article page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/articles/show/katalog-produktow-new-trendy-2023`)).status).toBe(200));
//         test('Fetch Articles page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/articles`)).status).toBe(200));
//         test('Fetch Articles Category page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/articles/category/aktualnosci`)).status).toBe(200));
//         test('Fetch Voievodeships data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/location/voivodeships?search=maz`)).status).toBe(200));
//         test('Fetch Cities data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/location/cities?search=rad`)).status).toBe(200));
//         test('Fetch Made To Measure page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/made-to-measure`)).status).toBe(200));
//         test('Fetch Places To Buy page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/place-to-buy/shops-list`)).status).toBe(200));
//         test('Fetch Coords List data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/place-to-buy/coords-list`)).status).toBe(200));
//         test('Fetch Privacy Policy data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/privacy-policy`)).status).toBe(200));
//         test('Fetch Products data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/products`)).status).toBe(200));
//         test('Fetch Product page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/products/kabina-prysznicowa-walk-in-eventa-jednoelementowa-z-dodatkowa-scianka`)).status).toBe(200));
//         test('Fetch Search page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/search`, { method: 'POST' })).status).toBe(200));
//         test('Fetch Service page data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/cms/page/service`)).status).toBe(200));
//     })

//     describe("Fetch data validation error", () => {
//         test('Fetch clipboard data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/products/clipboard`)).status).toBe(422));
//         test('Fetch Voievodeships data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/location/voivodeships`)).status).toBe(422));
//         test('Fetch Cities data', async () => expect((await fetch(`http://localhost:8000/api/v1/en_US/location/cities`)).status).toBe(422));
//     })
// })