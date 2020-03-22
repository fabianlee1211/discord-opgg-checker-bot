import { Logger } from '~storage/logger';
import { ICommand } from '~typings/i-typings';

export const gear: ICommand = {
  name: 'gear',
  description: 'Gets the recommended gears of a champion',
  async execute(message, args, models) {
    const reply = await models.gear.gen(message.author, args[0]);
    Logger.info('gear-command', null, { args });
    return message.channel.send(reply);
  },
};
