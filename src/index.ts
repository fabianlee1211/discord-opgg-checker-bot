import Discord from 'discord.js';
import { IModels, Models } from '~models/_models';
import { Shared } from '~models/_shared/_shared_models';
import { Logger } from '~storage/logger';
import { StorageBuilder } from '~storage/storage-builder';
import config from './config';

require('dotenv').config();

let models: IModels;
const storage = StorageBuilder.getStorage(config);
const commands = Shared.commands.getCommands();
const client = new Discord.Client();

client.once('ready', () => {
  models = Models.getModels(storage);
  Logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (!message?.content.startsWith(config.prefix) || message?.author.bot)
    return;

  // Split by spaces
  const args = message.content
    .toLowerCase()
    .slice(config.prefix.length)
    .split(/ +/);
  const command = args.shift().toLowerCase();

  if (!commands.has(command)) return;

  try {
    commands.get(command).execute(message, args, models);
  } catch (error) {
    Logger.error('command-error', error, message.author, { command, args });
    return message.reply('There was an error trying to execute that command!');
  }
});

client
  .login(process.env.CLIENT_TOKEN)
  .then(() => Logger.info('login-successfully', client.user))
  .catch((err) => Logger.error('login-failed', err));
