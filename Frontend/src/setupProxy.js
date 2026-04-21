const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Custom proxy configuration for Create React App dev server.
 * 
 * We use this instead of the simple "proxy" field in package.json to:
 * 1. Explicitly proxy only our known API endpoints (/api/v1).
 * 2. Prevent /socket.io requests (triggered by browser extensions or other tools) 
 *    from being forwarded to the FastAPI backend, which would cause 403 errors.
 */
module.exports = function(app) {
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      // No path rewrite needed as we want to keep the /api/v1 prefix
    })
  );

  // Explicitly block /socket.io requests to prevent logs spam during local development
  app.use('/socket.io', (req, res) => {
    res.status(404).json({ error: 'Socket.IO is not enabled in this environment' });
  });
};
