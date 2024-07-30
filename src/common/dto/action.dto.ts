import { ActionMetadata } from './action-metadata.dto';
import { GeneratedTransaction } from './transaction.dto';

export type ActionId = string;
export type ActionTransactionParams = { [key: string]: string };

export abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  abstract generateTransaction(
    parameters: ActionTransactionParams,
  ): Promise<GeneratedTransaction>;
}
