export default {
    routes: [

        {
            method: 'GET',
            path: '/routing/static-params',
            handler: 'routing.staticParams',
            config: {
                policies: [],
                middlewares: [],
            },
        },

        {
            method: 'GET',
            path: '/routing/sitemap',
            handler: 'routing.sitemap',
            config: {
                policies: [],
                middlewares: [],
            },
        },

        {
            method: 'GET',
            path: '/routing/metadata',
            handler: 'routing.metadata',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/routing/localizations',
            handler: 'routing.localizations',
        }
    ],
};
