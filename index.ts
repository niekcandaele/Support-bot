require('dotenv').config();

import { Message } from "discord.js";
import { CommandoClient } from "discord.js-commando";
import Docs from "./src/commands/support/docs";
import Tag from "./src/commands/support/tag";
import { detectors } from "./src/detectors";
import { Detector } from "./src/detectors/base";


class Bot {
    client: CommandoClient;
    detectors: Detector[] = [];

    constructor() {
        this.client = new CommandoClient({
            commandPrefix: '?',
            owner: '220554523561820160',
        });

        this.client.on('error', console.error);
    }

    async start() {
        await this.loadDetectors()

        this.client.registry
            .registerDefaultTypes()
            .registerGroups([
                ['support', 'Support commands'],
            ])
            .registerDefaultGroups()
            .registerDefaultCommands()
            .registerCommand(Docs)
            .registerCommand(Tag)

        this.client.once('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}! (${this.client.user.id})`);
        });

        this.client.login(process.env.DISCORD_BOT_TOKEN);
        this.client.on('message', (msg) => this.handleMessage(msg))
    }

    private async loadDetectors() {
        for (const detectorClass of detectors) {
            const d = new detectorClass();
            await d.init();

            this.detectors.push(d)
        }
    }

    private async handleMessage(message: Message) {
        for (const d of this.detectors) {
            await d.handleMessage(message);
        }
    }

}

const bot = new Bot();


bot.start();