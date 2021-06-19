import NodeCache from "node-cache";
// Start spying before the cache is initialized in the function
const setSpy = jest.spyOn(NodeCache.prototype, "set");
import getCommands from "./commandsCache";

describe("Commands cache", function () {
  it("Returns commands", async function () {
    const res = await getCommands();
    expect(res).toBeInstanceOf(Array);
  });

  it("Caches commands", async function () {
    const res = await getCommands();
    expect(setSpy).toBeCalledTimes(1);
    expect(res).toBeInstanceOf(Array);
    await getCommands();
    expect(setSpy).toBeCalledTimes(1);
  });
});
