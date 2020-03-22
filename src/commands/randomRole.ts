import { Logger } from '~storage/logger';
import { ICommand } from '~typings/i-typings';

const roles = ['Top', 'Jungle', 'Support', 'AD', 'Middle'];
const getRandomInt = (min, max): number => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
};

export const randomRole: ICommand = {
  name: 'randomrole',
  description: 'Get a random role',
  execute(message, _args, _models) {
    const role = `${roles[getRandomInt(0, roles.length)]}`;
    Logger.info('random-role-command');
    return message.channel.send(role);
  },
};
