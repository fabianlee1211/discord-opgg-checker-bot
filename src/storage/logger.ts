import { User } from 'discord.js';
import winston from 'winston';

const { createLogger, transports, format } = winston;

const { combine, printf, timestamp: timeStampFormatter } = format;

export class Logger {
  private static logger: winston.Logger;

  // Initialize the logger
  static async init(): Promise<boolean> {
    this.logger = createLogger({});
    const customFormat = printf(
      ({ level, message, timestamp, ...rest }) =>
        `${timestamp} ${level}: ${message} ${JSON.stringify(rest)}`,
    );

    const consoleTransport = new transports.Console({
      level: 'info',
      format: combine(timeStampFormatter(), customFormat),
    });

    this.logger.add(consoleTransport);
    this.logger.exceptions.handle(consoleTransport);

    return true;
  }

  // Logs general info
  static info(message: string, author?: User, extraFields?: object): void {
    this.logger.info(
      message,
      Logger.mergeLoggerObjects(null, author, extraFields),
    );
  }

  // Logs error
  static error(
    message: string,
    errorStack?: object,
    author?: User,
    extraFields?: object,
  ): void {
    this.logger.error(
      message,
      Logger.mergeLoggerObjects(errorStack, author, extraFields),
    );
  }

  // Merge author, error and custom properties for logger to print as 'rest'
  static mergeLoggerObjects(
    errorStack: object,
    author: User,
    extraFields: object,
  ): null | object {
    const authorObj = author ? { author } : null;
    const extraFieldsObj = extraFields || {};
    const errorStackObj = errorStack ? { stack: errorStack } : null;

    const mergeLoggerObjects = {
      ...authorObj,
      ...extraFieldsObj,
      ...errorStackObj,
    };

    return Object.keys(mergeLoggerObjects).length === 0
      ? null
      : mergeLoggerObjects;
  }
}
