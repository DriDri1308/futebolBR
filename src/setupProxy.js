const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/clubes',
    createProxyMiddleware({
      target: 'https://api.cartolafc.globo.com',
      changeOrigin: true,
    })
  );
};