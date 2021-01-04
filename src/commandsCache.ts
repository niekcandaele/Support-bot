import NodeCache from "node-cache";
import Axios from 'axios'

const cache = new NodeCache({ stdTTL: 360, checkperiod: 60 });

export interface Command {
    name: string,
    description: string,
    extendedDescription: string,
    aliases: string[]
}


export default async function getCommands(): Promise<Command[]> {
    let commands = cache.get('commands') as Command[];

    if (!commands) {
        const csmmResponse = await Axios.get('https://docs.csmm.app/assets/commands/csmmCommands.json')
        const csmmCommands = csmmResponse.data.map((_): Command => {
            if (!_.aliases) {
                _.aliases = []
            }

            if (!Array.isArray(_.aliases)) {
                _.aliases = _.aliases.split(',').map(_ => _.trim())
            }

            return _
        }) as Command[]

        const cpmResponse = await Axios.get('https://docs.csmm.app/assets/commands/cpmCommands.json')
        const cpmCommands = cpmResponse.data.map((_): Command => {
            return {
                name: _.command.split(',')[0],
                description: _.description,
                extendedDescription: _.help,
                aliases: _.command.split(',').map(_ => _.trim())
            }
        })

        commands = csmmCommands.concat(cpmCommands);
        cache.set('commands', commands)
    }
    return commands;
}