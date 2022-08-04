import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface ICommand {
  name: string;
  handler(interaction: ChatInputCommandInteraction): Promise<unknown>;
  slashCommand: Omit<
    SlashCommandBuilder,
    "addSubcommand" | "addSubcommandGroup"
  >;
}
