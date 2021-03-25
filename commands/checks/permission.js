function checkPermission(permission) {
    return function (ctx) {
        switch (permission) {
            case "owner":
                return ctx.guild.ownerID === ctx.author.id;
        }
    };
}

module.exports = { checkPermission };
