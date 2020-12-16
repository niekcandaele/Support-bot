const talkback = require('talkback');
const path = require('path');

module.exports = async () => {
    require('dotenv').config();


    process.env.STRAPI_GQL_URL = 'http://127.0.0.1:5545/graphql';

    global.gqlServer = talkback({
        // This is the Strapi URL
        host: "http://127.0.0.1:1337",
        record: talkback.Options.RecordMode.NEW,
        port: 5545,
        path: "./test/tapes/gql",
        tapeNameGenerator: (tapeNumber, tape) =>
            path.join(`${tape.req.method}`, `gql-${tapeNumber}`),
    });

    await global.gqlServer.start()
}