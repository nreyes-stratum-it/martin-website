export default {
    routes: [
        {
            method: "GET",
            path: "/content/find-by-slug",
            handler: "content.findBySlug",
            config: {
                auth: false,
            },
        },

    ],
};
