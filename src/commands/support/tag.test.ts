import Tag from "./tag";

const channelSendSpy = jest.fn()
const replySpy = jest.fn()

describe('COMMAND tag', function () {


    it('Replies to the text', async function () {
        const mockMsg = { channel: { send: channelSendSpy }, reply: replySpy }
        const command = new Tag({});
        await command.run(mockMsg, 'test');
        let call = channelSendSpy.mock.calls[0][0]

        expect(channelSendSpy).toBeCalledTimes(1)
        expect(call.description).toBe('Hello! This test is successful')


        await command.run(mockMsg, 'doesnt exist');
        // Should not have sent a tag reply
        expect(channelSendSpy).toBeCalledTimes(1)
        expect(replySpy).toBeCalledTimes(1)

        call = replySpy.mock.calls[0][0]

        expect(call).toBe('No matching tag found for "doesnt exist"')

    })
})