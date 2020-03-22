import Discord from 'discord.js';
import { IModels } from '~models/_models';

export interface IStorage {
  config: IConfig;
}

export interface IConfig {
  prefix: string;
  ddragon: {
    apiUrl: string;
    cdnUrl: string;
  };
  opGG: {
    statUrl(name: string): string;
  };
}

export interface ICommand {
  name: string;
  description: string;
  execute(
    message: Discord.Message | Discord.PartialMessage,
    args: string[],
    models: IModels,
  ): void;
}
