'use strict';
const axios = require('axios');

module.exports = async (body) => {

  const from_email = strapi.config.get('server.admin.sendgrid.from_email');

  try {
    await strapi.plugins['email'].services.email.send({
      to: body.to_email,
      from: from_email,
      replyTo: body.from_email,
      subject: body.subject,
      html: body.body,
      text: body.body?.replace(/<\/?[^>]+(>|$)/g, ""),
    });
    return true
  } catch(err) {
    console.log(err);
    return false
  }
}