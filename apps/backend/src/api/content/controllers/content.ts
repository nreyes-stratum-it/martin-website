import type {Context} from 'koa';
import {normalizeSlug} from '../../../utils/normalize-slug';

declare const strapi: any;

// Función recursiva para generar deep populate en todos los componentes
const buildPopulateTree = (componentUid: string): any => {
    const attributes: any = strapi.components[componentUid]?.attributes ?? {};
    const tree: Record<string, any> = {};

    for (const [fieldName, field] of Object.entries(attributes) as [string, any][]) {

        switch (field.type as any) {
            case 'component':
                tree[fieldName] = {populate: buildPopulateTree(field.component)};
                break;
            case 'dynamiczone':
                tree[fieldName] = {
                    populate: {
                        on: field.components.reduce((acc: any, comp: string) => {
                            acc[comp] = {populate: buildPopulateTree(comp)};
                            return acc;
                        }, {}),
                    },
                };
                break;
            case 'media':
                tree[fieldName] = true;
                break;
            case 'relation':
                tree[fieldName] = {populate: '*'};
                break;
        }
    }

    return tree;
};

export default {
    async findBySlug(ctx: Context) {
        const {slug: rawSlug = '/', locale = 'en'} = ctx.query as {
            slug?: string;
            locale?: string;
        };

        const slug = normalizeSlug(rawSlug);

        const contentTypes = Object.keys(strapi.contentTypes).filter(
            uid => uid.startsWith('api::') && strapi.contentTypes[uid].attributes?.slug
        );

        for (const uid of contentTypes) {
            const model = strapi.contentTypes[uid];
            const hasContentDZ = model.attributes.content?.type === 'dynamiczone';
            const components = hasContentDZ ? model.attributes.content.components : [];

            const populate: Record<string, any> = {
                localizations: {fields: ['slug', 'locale']},
            };

            if (hasContentDZ && components.length > 0) {
                populate.content = {
                    on: components.reduce((acc: any, comp: string) => {
                        acc[comp] = {populate: buildPopulateTree(comp)};
                        return acc;
                    }, {}),
                };
            }

            const [entry] = await strapi.entityService.findMany(uid as any, {
                locale,
                filters: {slug},
                populate,
                limit: 1,
            });

            if (entry) {
                ctx.body = {
                    collection: uid.split('::')[1].split('.')[0],
                    ...entry,
                };
                return;
            }
        }

        ctx.status = 404;
        ctx.body = {error: 'Content not found'};
    },
};
