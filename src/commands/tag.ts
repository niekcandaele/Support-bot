import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "./base";
import getCommands from "../commandsCache";
import { Tag as ITag, tags } from "../tags";

const tagChoices = tags
  .filter((tag) => tag.code)
  .map((tag) => {
    return {
      name: tag.code,
      value: tag.code,
    };
  });

export const TagCommand: ICommand = {
  name: "tag",
  slashCommand: new SlashCommandBuilder()
    .setName("tag")
    .setDescription("Replies with a tag")
    .addStringOption((option) =>
      option
        .setName("tag")
        .setRequired(true)
        .setDescription("What to search for")
        .addChoices(...tagChoices)
    ),
  handler: async (interaction) => {
    const tag = interaction.options.data
      .find((option) => option.name === "tag")
      .value.toString();

    const tagToSend = await determineReply(tag);

    if (!tagToSend) {
      const possibleTags = tags
        .filter((t) => t.code)
        .map((t) => `\`${t.code}\``)
        .sort(alphabeticalComparer)
        .join(", ");

      return interaction.reply(
        `No matching tag found for "${tag}". Here's some tags that you can use instead: ${possibleTags}`
      );
    }

    const embed = new EmbedBuilder();

    embed.setDescription(tagToSend.response);

    return interaction.reply({ embeds: [embed] });
  },
};

async function determineReply(textToSearch): Promise<ITag> {
  const tagToSend = tags
    .filter((t) => t.code)
    .find((t) => t.code.toLowerCase() === textToSearch.toLowerCase());

  if (tagToSend) {
    return tagToSend;
  }

  // If no tags were found, we try to match with a command
  const commands = await getCommands();

  const commandToSend = commands.find((c) => {
    return (
      c.name.toLowerCase() === textToSearch.toLowerCase() ||
      c.aliases.find((a) => a.toLowerCase() === textToSearch.toLowerCase())
    );
  });

  if (commandToSend) {
    const data: ITag = {
      response: `
            ${commandToSend.name}

            ${commandToSend.description}

            ${commandToSend.extendedDescription}`,
      code: "",
    };

    return data;
  }

  // Found nothing 😭
  return null;
}

function alphabeticalComparer(a: string, b: string): number {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
}
