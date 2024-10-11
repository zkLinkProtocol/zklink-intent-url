import { ethers } from 'ethers';
import { getQuote } from 'src/common/okxAPI';

import { GAS_COEFFICIENT } from './config';

export async function getUserERC20Balance(
  userAddress: string,
  tokenAddress: string,
  provider: ethers.Provider,
): Promise<bigint> {
  const erc20Abi = ['function balanceOf(address owner) view returns (uint256)'];

  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);

  try {
    const balance = await contract.balanceOf(userAddress);
    return BigInt(balance.toString());
  } catch (error) {
    console.error('Error fetching ERC20 balance:', error);
    throw error;
  }
}
export async function getEstimatedGasCost(
  sender: string,
  to: string,
  data: string,
  value: string,
  provider: ethers.Provider,
): Promise<bigint> {
  const estimatedGas = await provider.estimateGas({
    from: sender,
    to: to,
    data: data,
    value: value,
  });
  // gas price * estimatedGas
  const gasCost = await getGasCost(estimatedGas, provider);
  return gasCost;
}

export async function getGasCost(
  estimateGasFee: bigint,
  provider: ethers.Provider,
): Promise<bigint> {
  const gasPrice = await provider
    .getFeeData()
    .then((feeData) => feeData.gasPrice);

  return gasPrice
    ? BigInt(Math.floor(Number(GAS_COEFFICIENT) * Number(gasPrice))) *
        estimateGasFee
    : BigInt(0);
}

export async function getSolverFee(_amount: bigint): Promise<bigint> {
  return BigInt(0);
}
export async function getERC20GasCost(
  chainId: number,
  gasCost: bigint,
  erc20Address: string,
) {
  const quote = await getQuote(
    chainId,
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    erc20Address,
    gasCost,
  );
  return quote;
}
