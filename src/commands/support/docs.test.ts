import { CommandoClient, CommandoMessage } from "discord.js-commando";
import Docs from "./docs";

const algoliaResponses = {
    test: {
        "hits": [
            {
                "anchor": "custom-hook-parameters",
                "content": "Search String - A basic text match, such as &#x27;test message&#x27; or &#x27;secret base&#x27;, which must match  exactly  in order to trigger",
                "hierarchy": {
                    "lvl0": "Advanced",
                    "lvl1": "Custom Hook Parameters",
                    "lvl2": null,
                    "lvl3": null,
                    "lvl4": null,
                    "lvl5": null,
                    "lvl6": null
                },
                "url": "https://docs.csmm.app/en/csmm/hooks#custom-hook-parameters",
                "objectID": "e8dd0d1b3ec00d381cc9c1d7f6ed426a82ea83e5",
                "_snippetResult": {
                    "content": {
                        "value": "Search String - A basic text match, such as '<span class=\"algolia-docsearch-suggestion--highlight\">test</span> message",
                        "matchLevel": "full"
                    }
                },
                "_highlightResult": {
                    "content": {
                        "value": "Search String - A basic text match, such as '<span class=\"algolia-docsearch-suggestion--highlight\">test</span> message' or 'secret base', which must match  exactly  in order to trigger",
                        "matchLevel": "full",
                        "fullyHighlighted": false,
                        "matchedWords": [
                            "test"
                        ]
                    },
                    "hierarchy": {
                        "lvl0": {
                            "value": "Advanced",
                            "matchLevel": "none",
                            "matchedWords": []
                        },
                        "lvl1": {
                            "value": "Custom Hook Parameters",
                            "matchLevel": "none",
                            "matchedWords": []
                        }
                    },
                    "hierarchy_camel": [
                        {
                            "lvl0": {
                                "value": "Advanced",
                                "matchLevel": "none",
                                "matchedWords": []
                            },
                            "lvl1": {
                                "value": "Custom Hook Parameters",
                                "matchLevel": "none",
                                "matchedWords": []
                            }
                        }
                    ]
                }
            },
            {
                "anchor": "cron-jobs-server-automation",
                "content": "After creating a cron job, you will be able to test the command works successfully. By clicking the &#x27;Run now&#x27; button next to the job, it will run the command on the server immediately. Be aware of this if you are running a reboot or reset command!",
                "hierarchy": {
                    "lvl0": "Documentation",
                    "lvl1": "Cron jobs / server automation",
                    "lvl2": null,
                    "lvl3": null,
                    "lvl4": null,
                    "lvl5": null,
                    "lvl6": null
                },
                "url": "https://docs.csmm.app/en/cpm/configuration-examples#cron-jobs-server-automation",
                "objectID": "41ff63099a01cc6a2909bef4fffe39afce92e866",
                "_snippetResult": {
                    "content": {
                        "value": "you will be able to <span class=\"algolia-docsearch-suggestion--highlight\">test</span> the command works successfully",
                        "matchLevel": "full"
                    }
                },
                "_highlightResult": {
                    "content": {
                        "value": "After creating a cron job, you will be able to <span class=\"algolia-docsearch-suggestion--highlight\">test</span> the command works successfully. By clicking the 'Run now' button next to the job, it will run the command on the server immediately. Be aware of this if you are running a reboot or reset command!",
                        "matchLevel": "full",
                        "fullyHighlighted": false,
                        "matchedWords": [
                            "test"
                        ]
                    },
                    "hierarchy": {
                        "lvl0": {
                            "value": "Documentation",
                            "matchLevel": "none",
                            "matchedWords": []
                        },
                        "lvl1": {
                            "value": "Cron jobs / server automation",
                            "matchLevel": "none",
                            "matchedWords": []
                        }
                    },
                    "hierarchy_camel": [
                        {
                            "lvl0": {
                                "value": "Documentation",
                                "matchLevel": "none",
                                "matchedWords": []
                            },
                            "lvl1": {
                                "value": "Cron jobs / server automation",
                                "matchLevel": "none",
                                "matchedWords": []
                            }
                        }
                    ]
                }
            },
            {
                "anchor": "creating-the-listen-hook-for-specific-content-in-a-chatmessage",
                "content": "Next we need a command that will be triggered when the regex test against the log becomes a positive one (hit). CPM command  w2l  will write anything to log that you want. Even the output of a command. Now we have to figure out how to get information on when the next bloodmoon is. Vanilla command  ggs  will display all active gamestats. One of those stats will be the next bloodmoon day. It looks like this:  GameStat.BloodMoonDay = xx  where xx is the next bloodmoonday ingame",
                "hierarchy": {
                    "lvl0": "Advanced",
                    "lvl1": "Creating the &quot;listen&quot; hook for specific content in a chatmessage",
                    "lvl2": null,
                    "lvl3": null,
                    "lvl4": null,
                    "lvl5": null,
                    "lvl6": null
                },
                "url": "https://docs.csmm.app/en/7d2d/advanced-feature-guide-chathook#creating-the-listen-hook-for-specific-content-in-a-chatmessage",
                "objectID": "1c790ced1199cae544d3e6608ad1fe5431867de4",
                "_snippetResult": {
                    "content": {
                        "value": "be triggered when the regex <span class=\"algolia-docsearch-suggestion--highlight\">test</span> against the log becomes",
                        "matchLevel": "full"
                    }
                },
                "_highlightResult": {
                    "content": {
                        "value": "Next we need a command that will be triggered when the regex <span class=\"algolia-docsearch-suggestion--highlight\">test</span> against the log becomes a positive one (hit). CPM command  w2l  will write anything to log that you want. Even the output of a command. Now we have to figure out how to get information on when the next bloodmoon is. Vanilla command  ggs  will display all active gamestats. One of those stats will be the next bloodmoon day. It looks like this:  GameStat.BloodMoonDay = xx  where xx is the next bloodmoonday ingame",
                        "matchLevel": "full",
                        "fullyHighlighted": false,
                        "matchedWords": [
                            "test"
                        ]
                    },
                    "hierarchy": {
                        "lvl0": {
                            "value": "Advanced",
                            "matchLevel": "none",
                            "matchedWords": []
                        },
                        "lvl1": {
                            "value": "Creating the &quot;listen&quot; hook for specific content in a chatmessage",
                            "matchLevel": "none",
                            "matchedWords": []
                        }
                    },
                    "hierarchy_camel": [
                        {
                            "lvl0": {
                                "value": "Advanced",
                                "matchLevel": "none",
                                "matchedWords": []
                            },
                            "lvl1": {
                                "value": "Creating the &quot;listen&quot; hook for specific content in a chatmessage",
                                "matchLevel": "none",
                                "matchedWords": []
                            }
                        }
                    ]
                }
            }
        ],
        "nbHits": 63,
        "page": 0,
        "nbPages": 21,
        "hitsPerPage": 3,
        "exhaustiveNbHits": true,
        "query": "test",
        "params": "query=test&hitsPerPage=3",
        "processingTimeMS": 2
    },
    noResult: { hits: [] }
}

describe('COMMAND docs', function () {
    let command: Docs
    let channelSendSpy = jest.fn()

    beforeEach(function () {
        command = new Docs({} as CommandoClient);
        channelSendSpy = jest.fn()
    })

    it('Searches', async function () {
        const mockMsg = { channel: { send: channelSendSpy } } as unknown as CommandoMessage
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        command.searchIndex.search = jest.fn().mockReturnValue(algoliaResponses.test);
        await command.run(mockMsg, 'test');
        const call = channelSendSpy.mock.calls[0][0]

        expect(channelSendSpy).toBeCalledTimes(1)
        expect(call.fields.length).toBe(3);
        expect(call.footer.text).toBe('Searched for "test"')
        expect(call.fields).toStrictEqual([
            {
                name: 'CSMM - Custom Hook Parameters',
                value: '[CSMM/Advanced/Custom Hook Parameters](https://docs.csmm.app/en/csmm/hooks#custom-hook-parameters)',
                inline: false
            },
            {
                name: 'CPM - Cron jobs / server automation',
                value: '[CPM/Documentation/Cron jobs / server automation](https://docs.csmm.app/en/cpm/configuration-examples#cron-jobs-server-automation)',
                inline: false
            },
            {
                name: '7D2D - Creating the &quot;listen&quot; hook for specific content in a chatmessage',
                value: '[7D2D/Advanced/Creating the &quot;listen&quot; hook for specific content in a chatmessage](https://docs.csmm.app/en/7d2d/advanced-feature-guide-chathook#creating-the-listen-hook-for-specific-content-in-a-chatmessage)',
                inline: false
            }
        ])

    })

    it('Responds correctly when no results', async function () {
        const mockMsg = { channel: { send: channelSendSpy } } as unknown as CommandoMessage
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        command.searchIndex.search = jest.fn().mockReturnValue(algoliaResponses.noResult);
        await command.run(mockMsg, 'something that doesnt exist');
        const call = channelSendSpy.mock.calls[0][0]

        expect(channelSendSpy).toBeCalledTimes(1)
        expect(call.fields).toBe(undefined);
        expect(call).toBe('Did not find any results :(')

    })
})


