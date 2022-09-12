import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import getCommands from "../commandsCache";
import { ICommand } from "./base";

export const CommandHelpCommand: ICommand = {
  name: "command-help",
  slashCommand: new SlashCommandBuilder()
    .setName("command-help")
    .setDescription("Returns the help text of a command")
    .addStringOption((option) =>
      option
        .setName("command")
        .setRequired(true)
        .setDescription("The command to get help for")
    ),
  handler: async (interaction) => {
    const commandSearch = interaction.options.data
      .find((option) => option.name === "command")
      .value.toString();

    const commands = await findCommand(commandSearch);

    if (!commands.length)
      return interaction.reply(`No command found for "${commandSearch}"`);

    const embeds = commands.map((c) => {
      const embed = new EmbedBuilder();

      embed.setTitle(c.name);
      embed.setDescription(c.extendedDescription);

      embed.addFields([
        {
          name: "Aliases",
          value: c.aliases.join(", "),
          inline: true,
        },
        {
          name: "Type",
          value: c.type,
          inline: true,
        },
      ]);

      return embed;
    });

    return interaction.reply({ embeds });
  },
};

async function findCommand(commandSearch: string) {
  const commands = await getCommands();
  return commands.filter((c) => {
    return (
      c.name.toLowerCase() === commandSearch.toLowerCase() ||
      c.aliases.find((a) => a.toLowerCase() === commandSearch.toLowerCase())
    );
  });
}
