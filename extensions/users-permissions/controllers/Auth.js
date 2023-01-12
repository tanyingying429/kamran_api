'use strict';

const passport = require('passport');
const jwt_decode = require('jwt-decode');
const { sanitizeEntity, getAbsoluteServerUrl } = require('strapi-utils');
const formatError = error => error;
module.exports = {
    async saveUser(ctx) {
        const { body } = ctx.request
        let entity, newUser;

        if (body.is_crypto) {
            entity = await strapi.query('user', 'users-permissions').findOne({ wallet_address_contains: body.wallet_address });
            if (entity) {
                newUser = await strapi.query('user', 'users-permissions').update({ id: entity.id }, body);
            } else {
                newUser = await strapi.query('user', 'users-permissions').create(body);
            }
        } else {
            entity = await strapi.query('user', 'users-permissions').findOne({ email: body.email });
            if (entity) {
                newUser = await strapi.query('user', 'users-permissions').update({ id: entity.id }, body);
            } else {
                newUser = await strapi.query('user', 'users-permissions').create(body);
            }
        }

        return ctx.send({
            user: sanitizeEntity(
                newUser.toJSON
                    ? newUser.toJSON()
                    : newUser,
                {
                    model: strapi.query('user', 'users-permissions').model,
                }
            ),
        });
    },

    // Authentication for Application
    async authApp(ctx) {
        const request = ctx.request;
        const searchParams = request.URL.searchParams;
        const cid = searchParams.get("cid");
        const jwt = searchParams.get("jwt") || "guest";

        // Find a User by client id
        const entity = await strapi.query('user', 'users-permissions').findOne({ cid: cid });
        if (entity) {
            const response = {
                cid: cid,
                jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTcxODIyMDAzLCJleHAiOjE1NzQ0MTQwMDN9.T5XQGSDZ6TjgM5NYaVDbYJt84qHZTrtBqWu1Q3ShINw",
                user: sanitizeEntity(
                    entity,
                    {
                        model: strapi.query('user', 'users-permissions').model
                    }
                )
            };

            return response;
        }

        // Return error if no cid is found
        const errorResponse = ctx.response;
        errorResponse.status = 400;

        return errorResponse;
    },

    async getUser(ctx) {
        const { id } = ctx.params;
        let entity;
        entity = await strapi.query('user', 'users-permissions').findOne({ id: id });
        console.log("2---->", entity)
        if (!entity) {
            //error
            return {}
        } else {
            return sanitizeEntity(entity, { model: strapi.query('user', 'users-permissions').model });
        }
    },
    async getGoogle(ctx) {
        console.log("0---->")
        passport.authenticate('google', { scope: ['profile'] });
    },
    async getGoogleCallback(ctx) {
        console.log("callback---->", ctx.query)
        var decoded = jwt_decode(ctx.query['id_token']);

        console.log('decoded-->', decoded);
        // const client_url = strapi.config.get('server.admin.google.client_url');
        // const fail_url = strapi.config.get('server.admin.google.fail_url');
        // passport.authenticate('google', { 
        //   successRedirect: client_url,
        //   failureRedirect: fail_url, 
        //   failureMessage: true
        // }),

        // function(req, res) {
        //   // Successful authentication, redirect home.
        //   res.redirect('/');
        // }
    },
};
