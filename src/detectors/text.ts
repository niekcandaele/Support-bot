import { Message } from "discord.js";
import { Detector } from "./base";


export default class TextDetector extends Detector {

    async detect(msg: Message) {
        return [msg.content]
    }

    async init() { }

}