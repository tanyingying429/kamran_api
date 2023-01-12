module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1338),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '1e7ee802235453fec0bc850bcf85e478'),
    },
    sendgrid: {
      from_email: "info@reblium.com",
      apiKey: "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", 
    },
    email: {
      to_email: "contact@reblium.com",
    }
  },
});
