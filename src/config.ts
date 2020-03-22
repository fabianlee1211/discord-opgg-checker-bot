/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IConfig } from '~typings/i-typings';

const config: IConfig = {
  prefix: '!',
  ddragon: {
    cdnUrl: `https://ddragon.leagueoflegends.com/cdn`,
    apiUrl: `https://ddragon.leagueoflegends.com/api`,
  },
  opGG: {
    statUrl: (name) => `https://www.op.gg/champion/${name}/statistics`,
  },
};

export default config;
