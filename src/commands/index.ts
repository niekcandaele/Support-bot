import { DocsCommand } from "./docs";
import { TagCommand } from "./tag";
import { TldrCommand } from "./tldr";

export const commands = new Map([
  ["docs", DocsCommand],
  ["tag", TagCommand],
  ["tldr", TldrCommand],
]);
