import {factories} from '@strapi/strapi';
import type {Context} from 'koa';
import {normalizeSlug} from '../../../utils/normalize-slug';

export default factories.createCoreController('api::page.page', ({strapi}) => ({

    async findBySlug(ctx: Context) {
        const {slug: rawSlug, locale} = ctx.query as { slug?: string; locale?: string };

        if (!rawSlug || !locale) {
            ctx.status = 400;
            ctx.body = {error: 'Missing slug or locale parameter'};
            return;
        }

        const slug = normalizeSlug(rawSlug);

        // Construir populate profundo dinámico
        const collectionComponents = strapi.contentTypes["api::page.page"].attributes.content.components;

        const buildPopulateStructure = (componentName: string): any => {
            const componentAttributes = strapi.components[componentName]?.attributes ?? {};
            const populateStructure: Record<string, any> = {};

            for (const [fieldName, field] of Object.entries(componentAttributes) as [string, any][]) {
                if (field.type === "component") {
                    populateStructure[fieldName] = {
                        populate: buildPopulateStructure(field.component),
                    };
                } else if (field.type === "dynamiczone") {
                    populateStructure[fieldName] = {
                        populate: field.components.reduce((acc: any, comp: string) => {
                            acc.on = acc.on || {};
                            acc.on[comp] = {populate: buildPopulateStructure(comp)};
                            return acc;
                        }, {}),
                    };
                } else if (field.type === "media") {
                    populateStructure[fieldName] = true;
                } else if (field.type === "relation") {
                    populateStructure[fieldName] = {populate: '*'};
                }
            }

            return populateStructure;
        };

        const finalPopulateStructure = {
            content: {
                on: collectionComponents.reduce((acc: any, comp: string) => {
                    acc[comp] = {populate: buildPopulateStructure(comp)};
                    return acc;
                }, {}),
            },
            seo: true,
            localizations: true,
        };

        const [page] = await strapi.entityService.findMany('api::page.page', {
            locale,
            filters: {slug},
            populate: finalPopulateStructure,
            limit: 1,
        });

        if (!page) {
            ctx.notFound('Page not found');
            return;
        }

        ctx.body = page;
    },

}));
