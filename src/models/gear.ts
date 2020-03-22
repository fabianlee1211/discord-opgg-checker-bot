import { User } from 'discord.js';
import { IStorage } from '~typings/i-typings';
import { Champion, ChampionsModel } from './champion';

const pixYouTube = 'https://www.youtube.com/channel/UCyX_gEJaKTszr8XSnv3Wr1Q';

export class GearModel {
  constructor(
    private storage: IStorage,
    private championModel: ChampionsModel,
  ) {
    this.storage = storage;
    this.championModel = championModel;
  }

  // Generate the gear message
  async gen(author: User, message: string): Promise<any> {
    if (!message) return await this.parseMessage('empty');

    const specialCases = /^((pix)|(lulu))$/g;
    if (message.match(specialCases)) {
      return await this.parseMessage('pix');
    }

    const champions = await this.championModel.genChampions(author, message);

    if (!champions || champions.length === 0)
      return await this.parseMessage('not-found');

    // Find the exact match champion
    const matchedChampion = champions.find(
      (champion) => champion.id.toLowerCase() === message,
    );

    if (matchedChampion) {
      return await this.parseMessage('found', matchedChampion);
    } else {
      const possibleChampions = champions.map(
        (champion, index) => `${index + 1}. ${champion.name}`,
      );
      const firstPart = await this.parseMessage('multiple');
      return `${firstPart}${possibleChampions.join('\n')}`;
    }
  }

  private async parseMessage(
    messageType: string,
    champion?: Champion,
  ): Promise<any> {
    const latestVersion = await this.championModel.getLatestVersionNumber();
    let content = null;
    switch (messageType) {
      case 'empty':
        content = '試下打啲野...';
        break;
      case 'pix':
        content = `睇下鑽石Lulu點出裝啦！${pixYouTube}`;
        break;
      case 'not-found':
        content = '搵唔到隻英阿！';
        break;
      case 'multiple':
        content =
          '咁多隻搵唔到架，你試下打返佢地全名！\n你岩岩打出黎搵到既result有\n\n';
        break;
      case 'found':
        content = {
          embed: {
            color: 3447003,
            title: `${champion.name} - ${champion.title}`,
            url: this.storage.config.opGG.statUrl(champion.name.toLowerCase()),
            description: `睇下${champion.name}點出裝啦`,
            thumbnail: {
              url: `${this.storage.config.ddragon.cdnUrl}/${latestVersion}/img/champion/${champion.image.full}`,
            },
            timestamp: new Date(),
            footer: {
              text: 'OP.GG',
            },
          },
        };
        break;
      default:
        content = 'Gag';
    }

    return content;
  }
}
