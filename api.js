const request = require("request");
const config = require("./config");

const api = request.defaults({
    baseUrl: config.apiURL,
});

module.exports = api;
