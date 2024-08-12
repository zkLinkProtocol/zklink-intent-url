import { ActionMetadata } from './action-metadata.dto';
import { GeneratedTransaction } from './transaction.dto';

export type ActionId = string;
export type ActionTransactionParams = { chainId?: number; code: string } & {
  [key: string]: string;
};
export interface GenerateTransactionData {
  code: string;
  sender: string;
  params: ActionTransactionParams;
}
export abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  async validateIntentParams(_: { [key in string]: string }): Promise<string> {
    return Promise.resolve('');
  }

  async afterActionUrlCreated(
    _code: any,
    _params: { [key in string]: string },
  ): Promise<any> {
    console.log('nothing');
  }

  abstract generateTransaction(
    data: GenerateTransactionData,
  ): Promise<GeneratedTransaction>;
}
