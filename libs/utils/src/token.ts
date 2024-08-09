import { Provider, ethers } from 'ethers';

export async function getERC20SymbolAndDecimals(
  provider: Provider,
  tokenAddress,
): Promise<{ symbol: string; decimals: number }> {
  const abi = [
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
  ];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  const [symbol, decimals] = await Promise.all([
    tokenContract.symbol(),
    tokenContract.decimals(),
  ]);
  return { symbol, decimals };
}
