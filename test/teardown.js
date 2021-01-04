module.exports = async function () {
    await global.gqlServer.close();
    await global.docsServer.close();
};