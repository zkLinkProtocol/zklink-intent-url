import { JsonRpcProvider, Wallet } from 'ethers';

import action from '../libs/red-envelope/src/index';
import {
  DistributionModeValue,
  GasTokenValue,
} from '../libs/red-envelope/src/type';

const main = async () => {
  const provider = new JsonRpcProvider('https://sepolia.rpc.zklink.io');
  const privateKey =
    'c9a1406f3b136baa51cf3cef8d81103ab331a5154358e98c900dd42d19c69fdd';
  const wallet = new Wallet(privateKey, provider);
  const createRedEnvelopeTx = await action.afterActionUrlCreated({
    code: 2,
    sender: wallet.address,
    params: {
      distributionMode: DistributionModeValue.RandomAmountPerAddress,
      totalDistributionAmount: 100,
      distributionToken: '0x8a183994392CDBb3e6451cFC8cC779f7b0e907BA',
      amountOfRedEnvelopes: 20,
      gasToken: GasTokenValue.DistributedToken,
    },
  });

  const approveTx = await action.genApproveTx({
    code: 1,
    sender: wallet.address,
    params: {
      distributionMode: DistributionModeValue.RandomAmountPerAddress,
      totalDistributionAmount: 100,
      distributionToken: '0x8a183994392CDBb3e6451cFC8cC779f7b0e907BA',
      amountOfRedEnvelopes: 20,
      gasToken: GasTokenValue.DistributedToken,
    },
  });
  const approveTxData = approveTx.txs[0];
  await wallet.sendTransaction({
    to: approveTxData.to,
    data: approveTxData.data,
  });
  const tx = createRedEnvelopeTx.txs[0];
  const returnData = await wallet.sendTransaction({
    to: tx.to,
    data: tx.data,
  });

  console.log(returnData);
};

main();
