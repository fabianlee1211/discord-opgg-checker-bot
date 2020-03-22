import { IStorage } from '~typings/i-typings';
import { ChampionsModel } from './champion';
import { GearModel } from './gear';

export interface IModels {
  champions: ChampionsModel;
  gear: GearModel;
}

export class Models {
  static getModels(storage: IStorage): IModels {
    // Inject dependencies to each model as needed
    const champions = new ChampionsModel(storage);
    const gear = new GearModel(storage, champions);

    return {
      champions,
      gear,
    };
  }
}
