describe('Import pages', () => {
    test('About page imported', async () => {
        const cmp = await import ("~/pages/about/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Categories page imported', async () => {
        const cmp = await import ("~/pages/categories/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Category page imported', async () => {
        const cmp = await import ("~/pages/categories/[category]/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Collections page imported', async () => {
        const cmp = await import ("~/pages/collections/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Contact page imported', async () => {
        const cmp = await import ("~/pages/contact/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Download page imported', async () => {
        const cmp = await import ("~/pages/download/index.vue");
        expect(cmp).toBeDefined();
    });

    test('For professionals page imported', async () => {
        const cmp = await import ("~/pages/for-professionals/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Form online page imported', async () => {
        const cmp = await import ("~/pages/form-online/index.vue");
        expect(cmp).toBeDefined();
    });
    
    test('Information clausue page imported', async () => {
        const cmp = await import ("~/pages/information-clausue/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Inspirations page imported', async () => {
        const cmp = await import ("~/pages/blog/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Inspirations category page imported', async () => {
        const cmp = await import ("~/pages/blog/[category]/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Inspiration page imported', async () => {
        const cmp = await import ("~/pages/blog/[category]/[slug].vue");
        expect(cmp).toBeDefined();
    });

    test('Made to measure page imported', async () => {
        const cmp = await import ("~/pages/made-to-measure/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Place to buy page imported', async () => {
        const cmp = await import ("~/pages/place-to-buy/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Privacy policy page imported', async () => {
        const cmp = await import ("~/pages/privacy-policy/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Products page imported', async () => {
        const cmp = await import ("~/pages/products/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Product page imported', async () => {
        const cmp = await import ("~/pages/products/[category]/[slug].vue");
        expect(cmp).toBeDefined();
    });

    test('Search page imported', async () => {
        const cmp = await import ("~/pages/search/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Serivce page imported', async () => {
        const cmp = await import ("~/pages/service/index.vue");
        expect(cmp).toBeDefined();
    });

    test('Main page imported', async () => {
        const cmp = await import ("~/pages/index.vue");
        expect(cmp).toBeDefined();
    });
})