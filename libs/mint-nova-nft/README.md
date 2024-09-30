# Developer Guide
## Update Contract Address and RPC Provider
https://github.com/zkLinkProtocol/zklink-intent-url/blob/dev/libs/mint-nova-nft/src/config.ts
```typescript
export const metadata: ActionMetadata<FieldTypes> = {
    ......
    networks: [
        {
            name: 'zkLink Nova sepolia',
            chainId: '810181',
        },
    ],
    ......
}

export const providerConfig: { [key in number]: string } = {
  810181: 'https://sepolia.rpc.zklink.io',
};

export const contractConfig: { [key in number]: string } = {
  810181: '0x14BD2594aBbFEd161b365bD7855620d847D5D5c8',
};
```

## Security Considerations
https://github.com/zkLinkProtocol/zklink-intent-url/blob/dev/libs/mint-nova-nft/src/config.ts  
Remove the following configuration
```typescript
export const metadata: ActionMetadata<FieldTypes> = {
    ......
    intent: {
        components: [
            ......
            {
                name: 'key',
                label: 'Private Key',
                desc: 'Private Key',
                type: 'input',
                regex: '^[a-f0-9]{64}$',
                regexDesc: 'Key',
            },
            ......
}
```
https://github.com/zkLinkProtocol/zklink-intent-url/blob/dev/libs/mint-nova-nft/src/mint-nova-nft.service.ts
```typescript
const signer = new ethers.Wallet(formData.key);
```
Replace `formData.key` with your key from trusted source

## Transaction Sender as Recipient
https://github.com/zkLinkProtocol/zklink-intent-url/blob/dev/libs/mint-nova-nft/src/mint-nova-nft.service.ts  
Replace `formData.recipient` with `additionalData.account`

# Contract
https://github.com/zkLinkProtocol/zklink-nova-links-sbt-trademarks/blob/issues_cuboIII/contracts/nft/NovaGenesisPassPhaseIIINFT.sol
## Deploy Contract
https://github.com/zkLinkProtocol/zklink-nova-links-sbt-trademarks/tree/issues_cuboIII#deploy-genesispassphaseiii-nft

```solidity
function publicMint(
    address to,
    uint256 tokenId,
    uint256 amount,
    uint256 nonce,
    uint256 expiry,
    bytes calldata signature
) public payable nonReentrant whenNotPaused {
    require(totalSupply() < hardtopLimit, "Hardtop limit reached");
    require(!isMinted[to], "Has Minted");
    require(msg.value >= mintPrice * 1 gwei, "Not enough ETH sent");
    isMinted[to] = true;
    _safeMint(to, tokenId, amount, nonce, expiry, signature);
}

function setMintPrice(uint256 _mintPrice) external onlyOwner {
    _setMintPrice(_mintPrice);
}
```
Call `setMintPrice` to modify the mint fee

## Contract Changelog
1. Update preset `mintPrice`
2. add `setMintPrice` method to update `mintPrice`
