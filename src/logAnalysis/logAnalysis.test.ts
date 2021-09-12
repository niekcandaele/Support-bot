import { readdir, readFile } from "fs/promises";

import { LogAnalysis } from ".";

describe("Log analysis", () => {
  let files;
  beforeAll(async () => {
    const filesInDir = await readdir("test/logs");
    files = (
      await Promise.all(filesInDir.map((file) => readFile(`test/logs/${file}`)))
    ).map((file) => file.toString());
  });

  it("Can parse a log file", async () => {
    for (const file of files) {
      const analysis = new LogAnalysis(file.split("\r\n"));
      const results = await analysis.analyse();
      console.log(results);
    }
  });
});
