const { corsHeaders } = require('../utils/corsResponse');

exports.handler = async () => ({
    statusCode: 200,
    headers: corsHeaders,
    body: ''
});