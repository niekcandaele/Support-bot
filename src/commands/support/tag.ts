import { Message, MessageEmbed } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import leven from "leven";

import getCommands from "../../commandsCache";
import { Tag as ITag, tags } from "../../tags";

export default class Tag extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "tag",
      aliases: ["tags"],
      group: "support",
      memberName: "tag",
      description: "Pastes a tag",
    });
  }

  async run(
    message: CommandoMessage,
    args: string
  ): Promise<Message | Message[]> {
    const tagToSend = await determineReply(args);

    if (!tagToSend) {
      const possibleTags = tags
        .filter((t) => t.code)
        .map((t) => `\`${t.code}\``)
        .sort(alphabeticalComparer)
        .join(", ");
      return message.reply(
        `No matching tag found for "${args}". Here's some tags that you can use instead: ${possibleTags}`
      );
    }

    const embed = new MessageEmbed();

    embed.setDescription(tagToSend.tag.response);
    embed.setFooter(
      `Type: ${tagToSend.type} - Trigger: ${tagToSend.tag.code} - Levenshtein distance: ${tagToSend.distance}`
    );

    return message.channel.send(embed);
  }
}

async function determineReply(
  textToSearch: string
): Promise<{ tag: ITag; type: string; distance: number }> {
  const tagToSend = tags
    .filter((t) => t.code)
    .map((t) => {
      return {
        ...t,
        score: leven(t.code.toLowerCase(), textToSearch.toLowerCase()),
      };
    })
    .filter((t) => t.score < 3)
    .map((t) => {
      return { tag: t, type: "support tag", distance: t.score };
    });

  // If no tags were found, we try to match with a command
  const commands = await getCommands();

  const commandToSend = commands
    .filter((c) => c.name)
    .map((c) => {
      return {
        ...c,
        scoreName: leven(c.name.toLowerCase(), textToSearch.toLowerCase()),
        scoreAliases: c.aliases.length
          ? Math.min(
              ...c.aliases.map((a) =>
                leven(a.toLowerCase(), textToSearch.toLowerCase())
              )
            )
          : 99999,
      };
    })
    .map((c) => {
      return {
        ...c,
        score: Math.min(c.scoreName, c.scoreAliases) * c.priority,
      };
    })
    .filter((c) => c.scoreName < 3 || c.scoreAliases < 3)
    .map((c) => {
      const data: ITag = {
        response: `${c.name}\n\n${c.description}\n\n${c.extendedDescription}`,
        code: c.name,
      };
      return { tag: data, type: "command", distance: c.score };
    });

  const matches = commandToSend
    .concat(tagToSend)
    .sort((a, b) => a.distance - b.distance);

  return matches[0];
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
