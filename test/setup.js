const talkback = require("talkback");
const path = require("path");

module.exports = async () => {
  require("dotenv").config();

  process.env.DOCS_URL = "http://localhost:5546";

  global.docsServer = talkback({
    host: "https://docs.csmm.app",
    record: talkback.Options.RecordMode.NEW,
    port: 5546,
    path: "./test/tapes/docs",
    tapeNameGenerator: (tapeNumber, tape) =>
      path.join(`${tape.req.method}`, `docs-${tapeNumber}`),
  });

  await global.docsServer.start();
};
