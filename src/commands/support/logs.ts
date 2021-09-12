import axios from "axios";
import { Message, MessageAttachment, MessageEmbed } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

import { LogAnalysis } from "../../logAnalysis";
import {
  ILogAnalysisOutput,
  ILogError,
  ILogMod,
} from "../../logAnalysis/logAnalysisOutput";

export default class Log extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "logs",
      aliases: ["analyse", "analyse", "log"],
      group: "support",
      memberName: "logs",
      description: "Analyzes a log file",
    });
  }

  async run(message: CommandoMessage): Promise<Message | Message[]> {
    const attachments = message.attachments.array();

    for (const attachment of attachments) {
      const content = await downloadAttachment(attachment);
      const analyser = new LogAnalysis(content.split("\r\n"));
      const result = await analyser.analyse();
      const embed = constructEmbed(result, attachment);
      await message.reply(embed);
    }
    return [];
  }
}

async function downloadAttachment(attachment: MessageAttachment) {
  return (await axios.get(attachment.url, { responseType: "blob" })).data;
}

function constructEmbed(
  data: ILogAnalysisOutput,
  attachment: MessageAttachment
) {
  const totalErrors = data.errors.reduce((acc, error) => acc + error.count, 0);

  const embed = new MessageEmbed()
    .setTitle(`Log analysis for ${attachment.name}`)
    .setColor(0x00ae86)
    .setFooter("Log analysis")
    .addField("OS", data.OS, true)
    .addField("RAM", data.RAM, true)
    .addField("CPU", data.CPU, true)
    .addField("Game version", data.version, true)
    .addField(`Errors (${totalErrors})`, formatErrors(data.errors))
    .addField(`Mods (${data.mods.length})`, formatMods(data.mods));
  return embed;
}

function formatErrors(errors: ILogError[]) {
  return errors.map((error) => `${error.count}x ${error.message}`).join("\n");
}

function formatMods(mods: ILogMod[]) {
  return mods.map((mod) => `${mod.name} ${mod.version}`).join("\n");
}
