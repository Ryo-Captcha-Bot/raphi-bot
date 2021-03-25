require("dotenv").config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    role_name: "☑️",
    prefix: process.env.PREFIX || ".",
    apiURL: "https://raphi-captcha-api.herokuapp.com/",
};
