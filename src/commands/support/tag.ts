import { Command } from 'discord.js-commando';
import { MessageEmbed } from 'discord.js';
import getTags from '../../tagsCache';


export default class Tag extends Command {
    constructor(client) {
        super(client, {
            name: 'tag',
            aliases: ['tag'],
            group: 'support',
            memberName: 'tag',
            description: 'Pastes a tag',
        });
    }

    async run(message, args) {
        const tags = await getTags();

        const tagToSend = tags.filter(t => t.code).find(t => t.code.toLowerCase() === args.toLowerCase());

        if (!tagToSend) {
            return message.reply(`No matching tag found for "${args}"`)
        }

        const embed = new MessageEmbed();

        embed.setDescription(tagToSend.response);

        return message.channel.send(embed);
    }
};

