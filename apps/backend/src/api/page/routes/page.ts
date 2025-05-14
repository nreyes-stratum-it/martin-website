export default {
    routes: [
        {
            method: 'GET',
            path: '/pages/by-slug',      // /api/pages/by-slug?slug=/about&locale=en
            handler: 'page.findBySlug',
            config: {policies: [], middlewares: []},
        },
    ],
};
