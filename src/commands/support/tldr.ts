import { Message, MessageEmbed } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

import { tldr } from "../../tldr";

export default class Tldr extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "cmdhelp",
      aliases: ["helpcmd", "howdoesthiscommandwork", "cmd"],
      group: "support",
      memberName: "cmdhelp",
      description: "Returns basic info about a cli command",
    });
  }

  async run(
    message: CommandoMessage,
    args: string
  ): Promise<Message | Message[]> {
    try {
      const result = await tldr.get(args);
      const embed = new MessageEmbed();

      if (!result.length) {
        return message.reply("No results found.");
      }

      if (result.length === 1) {
        embed.setDescription(result[0].data);
        embed.setFooter(`Platform: ${result[0].platform}`);
      }

      if (result.length > 1) {
        const alternatePlatforms = result
          .slice(1, result.length + 1)
          .map((r) => r.platform)
          .join(", ");
        embed.setDescription(result[0].data);
        embed.setFooter(
          `Showing info for platform: ${result[0].platform}, also available on: ${alternatePlatforms}`
        );
      }

      return await message.reply(embed);
    } catch (error) {
      console.log(error);
      return message.reply("Woops, I messed up somewhere :(");
    }
  }
}
