import { Message, MessageEmbed } from "discord.js";

import { Tag, tags } from "../tags";

export abstract class Detector {
  public async handleMessage(message: Message): Promise<void> {
    const detectedText = await this.detect(message);

    const triggeredTags = await this.getTriggeredFromText(detectedText);

    const unique = [
      ...new Set(
        triggeredTags.map((o) =>
          JSON.stringify({
            trigger: o.trigger.toString(),
            response: o.response,
          })
        )
      ),
    ].map((s) => JSON.parse(s));
    for (const tag of unique) {
      this.sendResponse(message, tag);
    }
  }

  abstract detect(message: Message): Promise<string[]>;

  abstract init(): Promise<void>;

  private async getTriggeredFromText(texts: string[]) {
    const triggeredTags: Tag[] = [];
    for (const tag of tags) {
      if (!tag.trigger) {
        continue;
      }

      for (const text of texts) {
        if (tag.trigger instanceof RegExp) {
          if (tag.trigger.test(text)) {
            triggeredTags.push(tag);
          }
        } else {
          if (text.includes(tag.trigger)) {
            triggeredTags.push(tag);
          }
        }
      }
    }
    return triggeredTags;
  }

  private sendResponse(message: Message, tag: Tag) {
    const embed = new MessageEmbed();

    embed.setDescription(tag.response);
    embed.setFooter(`Triggered by "${tag.trigger.toString()}"`);
    return message.reply(embed);
  }
}
