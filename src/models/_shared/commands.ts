import Discord from 'discord.js';
import { ICommand } from '~typings/i-typings';
import * as commandFiles from '../../commands/_commands';

export class Commands {
  static getCommands(): Discord.Collection<string, ICommand> {
    const commands = new Discord.Collection<string, ICommand>();

    // Setup available commands
    for (const command of Object.entries(commandFiles)) {
      const [name, commandInfo]: [string, ICommand] = command;
      commands.set(name.toLowerCase(), commandInfo);
    }

    return commands;
  }
}
