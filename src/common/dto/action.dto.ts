import { ErrorMessage } from 'src/types';

import { ActionMetadata } from './action-metadata.dto';
import { TransactionInfo } from './transaction.dto';

export type ActionId = string;

export type BasicAdditionalParams = { code?: string; account?: string };

type NetworkAdditionalParams = {
  chainId: number;
};

export type GenerateFormParams<T extends string> = {
  [key in T]: string;
};

export type AdditionalParams = BasicAdditionalParams & NetworkAdditionalParams;

export type ActionTransactionParams<T extends string> =
  NetworkAdditionalParams & GenerateFormParams<T>;

export type GenerateTransactionParams<T extends string> = {
  additionalData: AdditionalParams;
  formData: {
    [key in T]: string;
  };
};

export abstract class Action<T extends string = string> {
  abstract getMetadata(): Promise<ActionMetadata<T>>;

  abstract generateTransaction(
    data: GenerateTransactionParams<T>,
  ): Promise<TransactionInfo[]>;

  async preCheckTransaction(
    _: GenerateTransactionParams<T>,
  ): Promise<{ enable: boolean; reason?: string }> {
    return {
      enable: true,
    };
  }

  async reportTransaction(
    _data: GenerateTransactionParams<T>,
    _txHash: string,
  ): Promise<{ message: string }> {
    return {
      message: 'Transaction Success',
    };
  }

  async validateFormData(_: GenerateFormParams<T>): Promise<ErrorMessage> {
    return '';
  }

  /**
   *
   * @description
   */
  async reloadAdvancedInfo?(data: BasicAdditionalParams): Promise<{
    title: string;
    content: string;
  }>;

  async onMagicLinkCreated?(
    data: GenerateTransactionParams<T>,
  ): Promise<TransactionInfo[]>;
}
