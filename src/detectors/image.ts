import { Message, MessageAttachment } from "discord.js";
import { Tag } from "../tagsCache";
import { Detector } from "./base";
import { createWorker, RecognizeResult, Worker } from 'tesseract.js';

export default class ImageDetector extends Detector {
    worker: Worker;

    async detect(msg: Message) {
        const detectedText = await this.getTextFromImages(msg.attachments.array());
        // There's a bunch of interesting data here
        // Perhaps we can do something more with it later...
        // console.log(detectedText);

        return detectedText.map(_ => _.data.text)
    }

    async init() {
        this.worker = createWorker({
            logger: m => console.log(m)
        });
        await this.worker.load();
        await this.worker.loadLanguage('eng');
        await this.worker.initialize('eng');
    }

    private async getTextFromImages(attachments: MessageAttachment[]): Promise<RecognizeResult[]> {

        const promises: Promise<RecognizeResult>[] = [];
        for (const attachment of attachments) {
            promises.push(this.worker.recognize(attachment.url))

        }
        return Promise.all(promises)
    }
}