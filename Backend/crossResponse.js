const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://scanngrub.vercel.app',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
};

const createResponse = (statusCode, body) => ({
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body)
});

module.exports = { createResponse, corsHeaders };