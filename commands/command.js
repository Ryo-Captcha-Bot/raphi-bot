const { prefix } = require("../config");

class Command {
    static commands = {};
    constructor(
        callback,
        { name = "", aliases = [], args = [], checks = [], brief = "" }
    ) {
        this.callback = callback;
        this.name = name;
        this.aliases = aliases;
        this.args = args;
        this.checks = checks;
        this.brief = brief;
        this.register();
    }

    register() {
        Command.commands[this.name] = this;
        this.aliases.forEach((value) => {
            Command.commands[value] = this;
        });
    }

    static set(
        options = {
            name: "",
            aliases: [],
            args: [],
            checks: [],
            brief: "",
        },
        callback = (ctx, ...args) => {}
    ) {
        return new Command(callback, options);
    }

    static get(commandName) {
        return this.commands[commandName];
    }

    static getCommandName(msgContent) {
        const section = msgContent.split(" ")[0];
        const name = section.slice(prefix.length);
        return name;
    }

    run(ctx, ...args) {
        for (let check of this.checks) {
            if (!check(ctx, args)) {
                console.log("O comando falhou");
                return;
            }
        }
        this.callback(ctx, ...args);
    }
}

module.exports = Command;
