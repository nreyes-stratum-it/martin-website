export default {
    routes: [
        {
            method: 'GET',
            path: '/global/header',
            handler: 'global.header',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
