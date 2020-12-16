import { Message } from "discord.js";
import { detect } from "tesseract.js";
import ImageDetector from "./image";

// How reliable is imgur going to be for this? :D
const att = { attachments: { 'array': () => [{ url: 'https://i.imgur.com/NBjUJf3.png' }] } } as unknown as Message

describe('DETECTOR image', function () {
    const detector = new ImageDetector();
    afterAll(async () => {
        await detector.worker.terminate()
    })

    jest.setTimeout(15000)
    it('Detects the text', async function () {
        await detector.init();
        const res = await detector.detect(att);
        expect(res.length).toBe(1)
        expect(res[0]).toMatch(/Not a valid player profile. Make sure you have logged in to this server. You should also try logging out and back in to CSMM./)
    })
})