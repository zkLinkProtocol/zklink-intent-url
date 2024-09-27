import { ErrorMessage, SuccessMessage } from 'src/types';

import { ActionMetadata } from './action-metadata.dto';
import { TransactionInfo } from './transaction.dto';

export type BasicAdditionalParams = {
  code?: string;
  account?: string;
  inviter?: string;
};

type NetworkAdditionalParams = {
  chainId: number;
};

export type GenerateFormParams<
  T extends Record<string, any> = Record<string, any>,
> = {
  [key in keyof T]: T[key];
};

export type AdditionalParams = BasicAdditionalParams & NetworkAdditionalParams;

export type ActionTransactionParams<
  T extends Record<string, any> = Record<string, any>,
> = NetworkAdditionalParams & GenerateFormParams<T>;

export type GenerateTransactionParams<
  T extends Record<string, any> = Record<string, any>,
> = {
  additionalData: AdditionalParams;
  formData: GenerateFormParams<T>;
};

export abstract class Action<
  T extends Record<string, any> = Record<string, any>,
> {
  /**
   * getMetadata returns metadata used to create a magic link.
   * This configuration data is essential for guiding the creator to build a complete magic link.
   * It includes the creation components in the dashboard and the way for rendering and interacting with the magic link.
   */
  abstract getMetadata(): Promise<ActionMetadata<T>>;

  /**
   * generateTransaction returns the parameters necessary for the frontend to construct the transaction.
   * The frontend will use these parameters to build the transaction
   * and send on-chain transaction requests in a queued manner.
   */
  abstract generateTransaction(
    data: GenerateTransactionParams<T>,
  ): Promise<TransactionInfo[]>;

  /**
   * During the creation process of the magic link,
   * this allows you to run your custom validation logic,
   * providing complex validation for the parameters used to create the magic link,
   * rather than just simple regular expressions.
   */
  async validateFormData(_: GenerateFormParams<T>): Promise<ErrorMessage> {
    return '';
  }

  /**
   * After creating the magic link, it may also be necessary to initiate an on-chain transaction.
   * For example, if I have a red envelope contract, each magic link should be created by the creator and deposit a sum of money into it,
   * allowing users to claim the red envelope associated with the magic link.
   */
  async onMagicLinkCreated?(
    data: GenerateTransactionParams<T>,
  ): Promise<TransactionInfo[]>;

  /**
   * We can render some custom HTML in the magic link to provide intuitive on-chain data
   * or centralized service data.
   * Users can manually refresh this data, and this method is designed for that purpose.
   *
   */
  async reloadAdvancedInfo?(data: BasicAdditionalParams): Promise<{
    title: string;
    content: string;
  }>;

  /**
   * Before sending the transaction with the magic link,
   * this function can be used to define some pre-checks
   * to determine whether the user can still trigger the transaction with the magic link.
   *
   * The default return is an empty string,
   * indicating no error message and that usage can continue.
   * If a non-empty string is returned,
   * it represents the reason for the inability to continue using it.
   */
  async preCheckTransaction(
    _: GenerateTransactionParams<T>,
  ): Promise<ErrorMessage> {
    return '';
  }

  /**
   * When the user initiates a transaction using the magic link,
   *  you may want to provide a message after the on-chain transaction is completed,
   * such as ‘You have successfully received 20 USDT.’
   * In this function, define and return the message.”
   */
  async reportTransaction(
    _data: GenerateTransactionParams<T>,
    _txHash: string,
  ): Promise<SuccessMessage> {
    return '';
  }

  /**
   * After creating the magic link, we want to provide the creator with a place to display
   * on-chain information and perform on-chain transactions. This function provides that capability.
   * You may want the creator to read some on-chain information to understand the usage of
   * the magic links they created or to initiate a transaction that changes the status of the created magic link
   * @param {string} code refer to magic link code
   */
  async generateManagementInfo?(code: string): Promise<{
    form: Array<{
      label: string;
      value: string | Array<Record<string, string>>;
    }>;
    triggers: Array<{
      text: string;
      transactions: TransactionInfo[];
    }>;
  }>;
}
