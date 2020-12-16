// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Message } from "discord.js";
import { CommandoClient, CommandoClientOptions } from "discord.js-commando";
import Docs from "./commands/support/docs";
import Tag from "./commands/support/tag";
import { detectors } from "./detectors";
import { Detector } from "./detectors/base";


export default class Bot {
    client: CommandoClient;
    detectors: Detector[] = [];

    constructor(clientOptions: CommandoClientOptions) {
        this.client = new CommandoClient({
            commandPrefix: '?',
            owner: '220554523561820160',
            ...clientOptions
        });

        this.client.on('error', console.error);
    }

    async start(): Promise<string> {
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

        this.client.on('message', (msg) => this.handleMessage(msg))
        return this.client.login(process.env.DISCORD_BOT_TOKEN);
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

const bot = new Bot({});


bot.start();