import { Message } from "discord.js";
import axios from "axios";
jest.mock("axios");
import FileDetector from "./file";

const att = {
  attachments: { array: () => [{ url: "url to a file" }] },
} as unknown as Message;

describe("DETECTOR file", function () {
  it("Detects the text", async function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    axios.get.mockResolvedValue({
      data: "Not a valid player profile. Make sure you have logged in to this server. You should also try logging out and back in to CSMM.",
    });

    const detector = new FileDetector();
    await detector.init();
    const res = await detector.detect(att);
    expect(res.length).toBe(1);
    expect(res[0]).toMatch(
      /Not a valid player profile. Make sure you have logged in to this server. You should also try logging out and back in to CSMM./
    );
  });
});
