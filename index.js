const Discord = require("discord.js");
const config = require("./config.js");
const Command = require("./commands/command");
const storage = require("./storage");
const api = require("./api");

const client = new Discord.Client();
require("./commands/say");
require("./commands/verify");

client.on("ready", async () => {
    await client.user.setPresence({
        activity: { name: `${config.prefix}help for commands!` },
    });
    console.log("READY!");
});

client.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm" && storage.codes[msg.author.id]) {
        const { token } = storage.codes[msg.author.id];
        const word = msg.content.trim();
        api.post(
            `/verify/${token}`,
            { json: true, body: { word } },
            (err, res, body) => {
                if (err === null) {
                    msg.channel.send(body.status);
                    if (body.code === 20) {
                        delete storage.codes[msg.author.id];
                    }
                }
            }
        );
    }
    const commandName = Command.getCommandName(msg.content);
    Command.get(commandName)?.run(
        {
            msg,
            guild: msg.guild,
            author: msg.author,
        },
        ...msg.content.split(" ").slice(1)
    );
});

client.login(config.token);
