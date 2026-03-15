/**
 * Netlify Function: API handler
 * Wraps the Express app with serverless-http for Netlify Functions
 */
const serverless = require('serverless-http');

let handler;

module.exports.handler = async (event, context) => {
    if (!handler) {
        const app = require('../../server');
        await app.startServer();
        handler = serverless(app);
    }
    return handler(event, context);
};
