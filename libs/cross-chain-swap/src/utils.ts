import { ethers } from 'ethers';

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
