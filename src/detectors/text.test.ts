import { Message } from "discord.js";
import TextDetector from "./text";

describe("DETECTOR text", function () {
  it("Detects the text", async function () {
    const detector = new TextDetector();
    await detector.init();
    const res = await detector.detect({ content: "Hello!" } as Message);
    expect(res.length).toBe(1);
    expect(res).toStrictEqual(["Hello!"]);
  });
});
