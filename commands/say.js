const { checkPermission } = require("./checks/permission");
const Command = require("./command");

Command.set(
    { name: "say", aliases: ["s"], checks: [checkPermission("owner")] },
    async function (ctx, ...args) {
        await ctx.msg.channel.send(args.join(" "));
    }
);
