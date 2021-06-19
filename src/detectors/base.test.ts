import { Message } from "discord.js";

import TextDetector from "./text";

const replySpy = jest.fn();

describe("DETECTOR base", function () {
  it("Replies to the text", async function () {
    // We use the Text implementation because it's the simplest
    const detector = new TextDetector();
    await detector.handleMessage({
      content: "Hello!",
      reply: replySpy,
    } as unknown as Message);
    expect(replySpy).toBeCalledTimes(0);
    await detector.handleMessage({
      content: "before test-regex after",
      reply: replySpy,
    } as unknown as Message);
    expect(replySpy).toBeCalledTimes(1);
    const call = replySpy.mock.calls[0][0];

    expect(call.description).toBe("Hello from a regex!");
    expect(call.footer.text).toMatch(/(Triggered by ).*/);

    await detector.handleMessage({
      content: "Not a valid player profile",
      reply: replySpy,
    } as unknown as Message);
    expect(replySpy).toBeCalledTimes(2);
  });
});
