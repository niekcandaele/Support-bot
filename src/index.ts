/* eslint-disable @typescript-eslint/no-var-requires */
import { Message, Client, GatewayIntentBits } from "discord.js";
import { Routes } from "discord.js";
import { REST } from "@discordjs/rest";

import { detectors } from "./detectors";
import { Detector } from "./detectors/base";
import { commands } from "./commands";

require("dotenv").config();

export default class Bot {
  client: Client;
  private clientId: string = process.env.DISCORD_CLIENT_ID;
  detectors: Detector[] = [];
  private rest: REST;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
      ],
    });

    this.client.on("error", console.error);
    this.rest = new REST({ version: "10" }).setToken(
      process.env.DISCORD_BOT_TOKEN
    );
  }

  async start(): Promise<string> {
    await this.loadDetectors();

    this.client.once("ready", async () => {
      console.log(
        `Logged in as ${this.client.user.tag}! (${this.client.user.id})`
      );
      await this.deployCommands();
    });

    this.client.on("messageCreate", (msg) => this.handleMessage(msg));

    this.client.on("interactionCreate", async (interaction) => {
      console.log(`Received interaction ${interaction.id}`);
      if (!interaction.isChatInputCommand()) return;
      console.log(`Interaction is: ${interaction.commandName}`);

      const command = commands.get(interaction.commandName);
      await command.handler(interaction);
    });

    return this.client.login(process.env.DISCORD_BOT_TOKEN);
  }

  private async loadDetectors() {
    for (const detectorClass of detectors) {
      const d = new detectorClass();
      await d.init();

      this.detectors.push(d);
    }
  }

  private async deployCommands() {
    try {
      await this.rest.put(Routes.applicationCommands(this.clientId), {
        body: await Promise.all(
          Array.from(commands.values()).map(async (command) => {
            if (command.slashCommand instanceof Function) {
              return await command.slashCommand();
            }

            return command.slashCommand.toJSON();
          })
        ),
      });
      console.log("Successfully registered application commands.");
    } catch (error) {
      // Discord.js validation does some special stuff with how they show errors
      // This is to make sure the error message is fully logged
      console.error(error);
      throw error();
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
