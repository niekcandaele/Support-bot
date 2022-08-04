import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { ICommand } from "./base";
import { getSearchIndex } from "../algolia";

export const DocsCommand: ICommand = {
  name: "docs",
  slashCommand: new SlashCommandBuilder()
    .setName("docs")
    .setDescription("Searches the docs")
    .addStringOption((option) =>
      option
        .setName("query")
        .setRequired(true)
        .setDescription("What to search for")
    ),
  handler: async (interaction) => {
    const query = interaction.options.data
      .find((option) => option.name === "query")
      .value.toString();

    const searchIndex = await getSearchIndex();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await searchIndex.search(query, {
      hitsPerPage: 3,
    });

    const embed = new EmbedBuilder();

    if (!res.hits || !res.hits.length) {
      return interaction.reply("Did not find any results :(");
    }

    embed.addFields(
      res.hits.map((hit) => {
        const hierarchy = parseHierarchy(hit.hierarchy);
        const type = getType(hit.url);

        return {
          name: `${type} - ${hierarchy[hierarchy.length - 1]}`,
          value: hit.url,
        };
      })
    );

    embed.setFooter({
      text: `Searched for "${query}"`,
    });

    return interaction.reply({ embeds: [embed] });
  },
};

function parseHierarchy(obj: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasOwnProperty: (arg0: string) => any;
}) {
  const hierarchy = [];

  for (let i = 0; i < 7; i++) {
    const key = `lvl${i}`;
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (element) {
        hierarchy.push(element);
      }
    }
  }
  return hierarchy;
}

function getType(url: string) {
  if (/docs.csmm.app\/en\/csmm/.test(url)) {
    return "CSMM";
  }

  if (/docs.csmm.app\/en\/cpm/.test(url)) {
    return "CPM";
  }

  if (/docs.csmm.app\/en\/7d2d/.test(url)) {
    return "7D2D";
  }

  return "CSMM";
}
