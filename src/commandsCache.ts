import Axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 360, checkperiod: 60 });

export interface Command {
  name: string;
  description: string;
  extendedDescription: string;
  aliases: string[];
  priority: number;
}

export default async function getCommands(): Promise<Command[]> {
  let commands = cache.get("commands") as Command[];

  if (!commands) {
    const csmmResponse = await Axios.get(
      `${process.env.DOCS_URL}/assets/commands/csmmCommands.json`
    );
    const csmmCommands = csmmResponse.data.map((_): Command => {
      if (!_.aliases) {
        _.aliases = [];
      }

      if (!Array.isArray(_.aliases)) {
        _.aliases = _.aliases.split(",").map((_) => _.trim());
      }

      _.priority = 1;

      return _;
    }) as Command[];

    const cpmResponse = await Axios.get(
      `${process.env.DOCS_URL}/assets/commands/cpmCommands.json`
    );
    const cpmCommands = cpmResponse.data.map((_): Command => {
      return {
        name: _.command.split(",")[0],
        description: _.description,
        extendedDescription: _.help,
        aliases: _.command.split(",").map((_) => _.trim()),
        priority: 2,
      };
    });

    commands = csmmCommands.concat(cpmCommands);
    cache.set("commands", commands);
  }
  return commands;
}
