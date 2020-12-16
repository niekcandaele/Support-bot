import NodeCache from "node-cache";
// Start spying before the cache is initialized in the function 
const setSpy = jest.spyOn(NodeCache.prototype, 'set');
import getTags from "./tagsCache";


describe('Tags cache', function () {

    it('Returns tags', async function () {
        const res = await getTags();
        expect(res.length).toBe(3)
    })

    it('Caches tags', async function () {
        const res = await getTags();
        expect(setSpy).toBeCalledTimes(1);
        expect(res.length).toBe(3)
        await getTags();
        expect(setSpy).toBeCalledTimes(1);

    })
})