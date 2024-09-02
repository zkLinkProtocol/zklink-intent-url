import { Contract, ContractMethodArgs, Provider } from 'ethers';

const MULTICALL_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

const MULTICALL_ABI_ETHERS = [
  // https://github.com/mds1/multicall
  'function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)',
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
];

export class Multicall<A extends Array<any>> {
  private provider: Provider;
  private contractMethodArgs: ContractMethodArgs<A>[];
  private contract: Contract;
  constructor(
    provider: Provider,
    multicallAddress: string = MULTICALL_ADDRESS,
  ) {
    this.provider = provider;
    this.contractMethodArgs = [];
    this.contract = new Contract(
      multicallAddress,
      MULTICALL_ABI_ETHERS,
      this.provider,
    );
  }

  public appendTransaction(tx: any) {
    this.contractMethodArgs.push(tx);
    return this;
  }

  public async populateTransaction() {
    return this.contract.aggregate3(this.contractMethodArgs);
  }
}
