import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';
import getTags from '../../tagsCache';


export default class Tag extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'tag',
            aliases: ['tags'],
            group: 'support',
            memberName: 'tag',
            description: 'Pastes a tag',
        });
    }

    async run(message: CommandoMessage, args: string): Promise<Message | Message[]> {
        const tags = await getTags();

        const tagToSend = tags.filter(t => t.code).find(t => t.code.toLowerCase() === args.toLowerCase());

        if (!tagToSend) {
            const possibleTags = tags.filter(t => t.code).map(t => `\`${t.code}\``).join(', ')
            return message.reply(`No matching tag found for "${args}". Here's some tags that you can use instead: ${possibleTags}`)
        }

        const embed = new MessageEmbed();

        embed.setDescription(tagToSend.response);

        return message.channel.send(embed);
    }
}

