import { Action, ActionMetadata } from 'src/actions/interface';

const action: Action = {
  getMetadata() {
    return {
      title: 'Swap',
      description: 'Swap tokens',
      metadata: {
        'contract-address': '0x',
      },
      network: {
        name: 'Ethereum',
        chainId: '1',
        contractAddress: '0x',
      },
      dApp: {
        name: 'Uniswap',
        url: 'https://uniswap.org/',
      },
      author: {
        name: 'Uniswap',
        x: '0x',
        github: '',
        discord: '',
      },
      intent: {
        components: [],
        humanize: '',
      },
    };
  },
  generateTransaction(parameters: any[]) {
    return null;
  },
  postTransaction(signedTransaction: any) {
    return true;
  },
};

export default action;
