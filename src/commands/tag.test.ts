import { ChatInputCommandInteraction } from "discord.js";
import { TagCommand } from "./tag";

let replySpy = jest.fn();

describe("COMMAND tag", function () {
  beforeEach(() => {
    replySpy = jest.fn();
  });

  it("Replies to the text", async function () {
    const mockInteraction = {
      options: { data: [{ name: "tag", value: "test" }] },
      reply: replySpy,
    } as unknown as ChatInputCommandInteraction;
    await TagCommand.handler(mockInteraction);
    let call = replySpy.mock.calls[0][0];

    expect(replySpy).toBeCalledTimes(1);
    expect(call.embeds[0].data.description).toBe(
      "Hello! This test is successful"
    );

    const mockInteraction2 = {
      options: { data: [{ name: "tag", value: "doesnt exist" }] },
      reply: replySpy,
    } as unknown as ChatInputCommandInteraction;
    await TagCommand.handler(mockInteraction2);

    expect(replySpy).toBeCalledTimes(2);

    call = replySpy.mock.calls[1][0];

    expect(call).toMatch(
      /No matching tag found for "doesnt exist". Here's some tags that you can use instead:/
    );
  });
});
