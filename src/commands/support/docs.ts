import { Command } from 'discord.js-commando';
import algoliasearch from 'algoliasearch';
import { MessageEmbed } from 'discord.js';

export default class Docs extends Command {
    searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
    searchIndex = this.searchClient.initIndex('csmm');

    constructor(client) {
        super(client, {
            name: 'docs',
            aliases: ['search'],
            group: 'support',
            memberName: 'docs',
            description: 'Searches the docs.',
        });
    }

    async run(message, args) {

        const res: any = await this.searchIndex.search(args, {
            hitsPerPage: 3,
        })

        const embed = new MessageEmbed();

        if (!res.hits.length) {
            return message.channel.send('Did not find any results :(');
        }

        for (const hit of res.hits) {
            const hierarchy = parseHierarchy(hit.hierarchy)
            const type = getType(hit.url)

            const friendlyText = `${type} - ${hierarchy[hierarchy.length - 1]}`

            embed.addField(friendlyText, `[${type}/${hierarchy.join('/')}](${hit.url})`)
        }

        embed.setFooter(`Searched for "${args}"`)

        return message.channel.send(embed);
    }
};


function parseHierarchy(obj) {
    const hierarchy = [];

    for (let i = 0; i < 7; i++) {
        const key = `lvl${i}`;
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (element) {
                hierarchy.push(element)
            }
        }
    }
    return hierarchy
}

function getType(url) {

    if (/docs.csmm.app\/en\/csmm/.test(url)) {
        return 'CSMM'
    }

    if (/docs.csmm.app\/en\/cpm/.test(url)) {
        return 'CPM'
    }

    if (/docs.csmm.app\/en\/7d2d/.test(url)) {
        return '7D2D'
    }

    return "CSMM";
}