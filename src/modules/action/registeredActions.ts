import * as buyMeACoffeeAction from '@action/buy-me-a-coffee';
import * as crossChainSwapAction from '@action/cross-chain-swap';
import * as novaSwapAction from '@action/novaswap';
import * as redEnvelopAction from '@action/red-envelope';

export const registeredActions = [
  { key: 'novaswap', module: novaSwapAction.default },
  { key: 'buyMeACoffee', module: buyMeACoffeeAction.default },
  { key: 'crossChainSwap', module: crossChainSwapAction.default },
  { key: 'red-envelop', module: redEnvelopAction.default },
];
