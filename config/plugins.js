module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1338),
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: "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",
      },
      settings: {
        from: 'info@reblium.com',
        replyTo: 'hantig1986@gmail.com',
      },
    },
  });
  