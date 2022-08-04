import axios from "axios";
import { Message, Attachment } from "discord.js";

import { Detector } from "./base";

export default class FileDetector extends Detector {
  worker: Worker;

  async detect(msg: Message): Promise<string[]> {
    const detectedText = await this.getTextFromFiles(
      Array.from(msg.attachments.values())
    );
    return detectedText;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async init(): Promise<void> {}

  private async getTextFromFiles(attachments: Attachment[]): Promise<string[]> {
    const promises: Promise<{ data: string }>[] = [];
    for (const attachment of attachments) {
      promises.push(axios.get(attachment.url, { responseType: "blob" }));
    }
    return (await Promise.all(promises)).map((_) => _.data);
  }
}
