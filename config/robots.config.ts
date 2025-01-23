export default [
    { UserAgent: 'Googlebot' },
    { Allow: '/' },

    { UserAgent: 'Amazonbot' },
    { Disallow: '/' },

    { UserAgent: 'ClaudeBot' },
    { Disallow: '/' },

    { UserAgent: 'YandexBot' },
    { Disallow: '/' },

    { UserAgent: 'YandexRenderResourcesBot' },
    { Disallow: '/' },

    { UserAgent: 'BacklinksExtendedBot' },
    { Disallow: '/' },

    { UserAgent: 'RU_Bot' },
    { Disallow: '/' },

    { UserAgent: 'PetalBot' },
    { Disallow: '/' },

    { UserAgent: '*' },
    { Disallow: '/' },
    { CrawlDelay: '10' },
]