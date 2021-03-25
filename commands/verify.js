const Command = require("./command");
const storage = require("../storage");
const config = require("../config");
const api = require("../api");

function fetchToken() {
    return new Promise((resolve, reject) => {
        api.get("/generate", { json: true }, (err, res, body) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(body.token);
            }
        });
    });
}

Command.set(
    { name: "verify", aliases: ["vf", "vfy"] },
    async function (ctx, ...args) {
        const author = ctx.author;
        const token = await fetchToken();
        await author.send({
            embed: {
                title: `Verify yourself in ${ctx.guild.name}`,
                description: "Solve the captcha below to get verified",
                image: {
                    url: config.apiURL + "captcha/" + token,
                },
            },
        });
        storage.codes[author.id] = {
            guildId: ctx.guild.id,
            token,
        };
    }
);
