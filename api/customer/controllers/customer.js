'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async contact_us(ctx) {
        const { body } = ctx.request;
        
        let res
        
        let contact  = await strapi.services.customer.create({
            from_email: body.from_email,
            from_name: body.from_name,
            to_email: body.to_email,
            to_name: body.to_name,
            subject: body.subject,
            body: body.body,
            provider: body.provider
        });

        if (body.provider === "provider1") {
            res = await strapi.config.functions.sendEmailByProvider1(body);
        } else {
            res = await strapi.config.functions.sendEmailByProvider2(body);
        }

        await strapi.services.customer.update({ id: contact.id }, {
            is_success: res,
        });

       // Send 201 created
       return { result: res };
    },
};
