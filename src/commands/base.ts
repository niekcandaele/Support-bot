import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

type SlashCommand = Omit<
  SlashCommandBuilder,
  "addSubcommand" | "addSubcommandGroup"
>;
export interface ICommand {
  name: string;
  handler(interaction: ChatInputCommandInteraction): Promise<unknown>;
  slashCommand: SlashCommand | (() => Promise<SlashCommand>);
}
