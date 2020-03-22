import { Logger } from '~storage/logger';
import { IStorage } from '~typings/i-typings';

export class StorageBuilder {
  static getStorage(config): IStorage {
    const storage: any = {};

    storage.config = config;

    Logger.init().then(() => {
      Logger.info('Initialized Logger');
    });

    return {
      ...storage,
    };
  }
}
