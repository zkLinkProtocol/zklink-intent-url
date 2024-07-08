import { Transaction } from 'ethers';

export interface ActionMetadata {
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
}

export interface Action {
  getMetadata(): ActionMetadata;
  generateTransaction(parameters: any[]): Transaction;
  postTransaction(signedTransaction: Transaction): boolean;
}
