import { ActionMetadata } from './action-metadata.dto';
import { GeneratedTransaction } from './transaction.dto';

export type ActionId = string;
export type ActionTransactionParams = { chainId: number } & {
  [key: string]: string;
};
export interface GenerateTransactionData {
  code: string;
  sender: string;
  params: ActionTransactionParams;
}
export abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  abstract generateTransaction(
    data: GenerateTransactionData,
  ): Promise<GeneratedTransaction>;

  async validateIntentParams(_: ActionTransactionParams): Promise<string> {
    return Promise.resolve('');
  }

  async getRealTimeContent?(
    data: Omit<GenerateTransactionData, 'params'>,
  ): Promise<{
    title: string;
    content: string;
  }>;

  async afterActionUrlCreated?(
    data: GenerateTransactionData,
  ): Promise<GeneratedTransaction>;
}
