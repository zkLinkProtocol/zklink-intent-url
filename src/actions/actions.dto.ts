import { ActionId } from './adapter';
import { ActionMetadata } from './interface';

export class ActionResponseDto {
  id: ActionId;
  title: string;
  description: string;
  metadata: {
    [key: string]: string;
  };
  network: {
    name: string;
    chainId: string;
    contractAddress: string;
  };
  dApp: {
    name: string;
    url: string;
  };
  author: {
    name: string;
    x: string;
    github: string;
    discord: string;
  };
  intent: {
    components: {
      name: string;
      label: string;
      desc: string;
      type: 'input' | 'searchSelect' | 'searchSelectErc20' | 'text';
      regex: string;
      regexDesc: string;
      options: {
        label: string;
        value: string;
      }[];
    }[];
    humanize: string;
  };

  constructor(id: ActionId, metadata: ActionMetadata) {
    this.id = id;
    this.title = metadata.title;
    this.description = metadata.description;
    this.metadata = metadata.metadata;
    this.network = metadata.network;
    this.dApp = metadata.dApp;
    this.author = metadata.author;
    this.intent = metadata.intent;
  }
}
