import { Message, MessageAttachment } from "discord.js";
import { Detector } from "./base";
import { createWorker, RecognizeResult, Worker } from "tesseract.js";

export default class ImageDetector extends Detector {
  worker: Worker;

  async detect(msg: Message): Promise<string[]> {
    const detectedText = await this.getTextFromImages(msg.attachments.array());
    // There's a bunch of interesting data here
    // Perhaps we can do something more with it later...
    // console.log(detectedText);

    return detectedText.map((_) => _.data.text);
  }

  async init(): Promise<void> {
    this.worker = createWorker({
      logger: (m) => console.log(m),
    });
    await this.worker.load();
    await this.worker.loadLanguage("eng");
    await this.worker.initialize("eng");
  }

  private async getTextFromImages(
    attachments: MessageAttachment[]
  ): Promise<RecognizeResult[]> {
    const promises: Promise<RecognizeResult>[] = [];
    for (const attachment of attachments) {
      if (!/bmp|jpg|png|pbm$/g.test(attachment.url)) {
        // Not a valid image format
        // see https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md#image-format
        continue;
      }

      promises.push(this.worker.recognize(attachment.url));
    }
    return Promise.all(promises);
  }
}
