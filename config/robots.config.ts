export default [
    { UserAgent: 'Googlebot' },
    { Allow: '/' },

    { UserAgent: '*' },
    { Disallow: '/' },

    { UserAgent: 'Amazonbot' },
    { Disallow: '/' },

    { UserAgent: 'ClaudeBot' },
    { Disallow: '/' },
]