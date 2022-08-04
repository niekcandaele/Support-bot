import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "./base";
import { tldr } from "../tldr";

export const TldrCommand: ICommand = {
  name: "tldr",
  slashCommand: new SlashCommandBuilder()
    .setName("tldr")
    .setDescription("Returns basic info about a cli command")
    .addStringOption((option) =>
      option
        .setName("command")
        .setRequired(true)
        .setDescription("What to search for")
    ),
  handler: async (interaction) => {
    const command = interaction.options.data
      .find((option) => option.name === "command")
      .value.toString();
    const result = await tldr.get(command);
    const embed = new EmbedBuilder();

    if (!result.length) {
      return interaction.reply("No results found.");
    }

    if (result.length === 1) {
      embed.setDescription(result[0].data);
      embed.setFooter({ text: `Platform: ${result[0].platform}` });
    }

    if (result.length > 1) {
      const alternatePlatforms = result
        .slice(1, result.length + 1)
        .map((r) => r.platform)
        .join(", ");
      embed.setDescription(result[0].data);
      embed.setFooter({
        text: `Showing info for platform: ${result[0].platform}, also available on: ${alternatePlatforms}`,
      });
    }

    return await interaction.reply({ embeds: [embed] });
  },
};
