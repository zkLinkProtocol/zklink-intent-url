type TransactionResponseStatus = 'success' | 'failure' | 'rejected';

export interface TransactionResponse {
  status: TransactionResponseStatus;
  hash?: string;
  reason?: string;
}
