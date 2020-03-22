import { Shared } from '~models/_shared/_shared_models';
import { Logger } from '~storage/logger';
import { ICommand } from '~typings/i-typings';

export const help: ICommand = {
  name: 'help',
  description: 'List out available commands',
  execute(message, _args, _models) {
    const listOfCommands = Array.from(Shared.commands.getCommands())
      .map(([name, config]) => `${name} - ${config.description}`)
      .sort((a: any, b: any) => a - b);

    Logger.info('help-command');

    return message.channel.send(
      `List of commands:\n--------------------\n${listOfCommands.join('\n')}`,
    );
  },
};
