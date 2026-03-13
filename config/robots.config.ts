export default [
    { UserAgent: 'Googlebot' },
    { Allow: '/' },

    { UserAgent: 'Amazonbot' },
    { Disallow: '/' },
    
    { UserAgent: 'Meta-ExternalAgent' },
    { Disallow: '/' },
    
    { UserAgent: 'dotbot' },
    { Disallow: '/' },

    { UserAgent: 'GPTBot' },
    { Allow: '/' },
    
    { UserAgent: 'OAI-SearchBot' },
    { Disallow: '/' },
    
    { UserAgent: 'Baiduspider' },
    { Disallow: '/' },
    
    { UserAgent: 'ByteDanceSpider' },
    { Disallow: '/' },
    
    { UserAgent: 'Bytespider' },
    { Disallow: '/' },
    
    { UserAgent: 'HTTrack' },
    { Disallow: '/' },
    
    { UserAgent: 'Sogou web spider' },
    { Disallow: '/' },
    
    { UserAgent: 'TeleportPro' },
    { Disallow: '/' },
    
    { UserAgent: 'WebCopier' },
    { Disallow: '/' },
    
    { UserAgent: 'WebStripper' },
    { Disallow: '/' },

    { UserAgent: 'ClaudeBot' },
    { Allow: '/' },

    { UserAgent: 'Yandex' },
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
    
    { UserAgent: 'wget' },
    { Disallow: '/' },

    { UserAgent: 'Google-Extended' },
    { Allow: '/' },

    { UserAgent: '*' },
    { Disallow: '/' },
    { CrawlDelay: '10' },
]