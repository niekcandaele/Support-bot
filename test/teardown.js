module.exports = async function () {
    await global.gqlServer.close();
};