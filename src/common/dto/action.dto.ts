import { ActionMetadata } from './action-metadata.dto';
import { GeneratedTransaction } from './transaction.dto';

export type ActionId = string;

export abstract class Action {
  abstract getMetadata(): Promise<ActionMetadata>;

  abstract generateTransaction(parameters: {
    [key: string]: any;
  }): Promise<GeneratedTransaction>;
}
