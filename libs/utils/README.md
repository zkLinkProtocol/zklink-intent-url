
utils provides some tools to help developers build actions.

## Multicall
The `Multicall` class can wrap multiple transactions, resulting in only one transaction on-chain. If you want to distribute fees or commission outside the main business, this utility class can be useful.

An example of usage:

```ts
const provider = new ethers.JsonRpcProvider(RPC_URL);
const multicallAddress = '0xcA11bde05977b3631167028862bE2a173976CA11';
const multicall = new Multicall(provider, multicallAddress);

multicall
  .appendTransaction({
    target: contractAddress,
    callData: '0x...',
    allowFailure: false, // We allow failure for all calls.
  })
  .appendTransaction({
    to: developerAddress, // commission fee to developer
    value: 100,
  })
  .appendTransaction({
    to: developerAddress, // commission fee to developer
    value: 100,
  });
const tx = await multicall.populateTransaction();
```
