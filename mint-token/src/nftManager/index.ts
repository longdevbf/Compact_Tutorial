import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { nativeToken } from '@midnight-ntwrk/zswap';

class NFTManager {
  private contract: any;
  private providers: any;
  private wallet: any;
  
  // Deploy contract
  async deploy(collectionName: string): Promise<string> {
    const NFTContract = await import('./contracts/nft/index.cjs');
    
    const contractInstance = new NFTContract.Contract({
      name: collectionName
    });
    
    const deployment = await deployContract(this.providers, {
      contract: contractInstance
    });
    
    return deployment.deployTxData.public.contractAddress;
  }
  
  // Mint NFT
  async mintNFT(
    tokenId: bigint,
    recipientAddress: string,
    nonce: Uint8Array
  ): Promise<any> {
    // Call contract mint function
    const tx = await this.contract.callTx.mintNFT(
      tokenId,
      { tag: 'left', value: recipientAddress }, // ZswapCoinPublicKey
      nonce
    );
    
    return tx;
  }
  
  // Transfer NFT (không cần contract function)
  async transferNFT(
    tokenId: bigint,
    contractAddress: string,
    recipientAddress: string
  ): Promise<any> {
    // Tính token type từ domain separator
    const domainSep = this.computeDomainSep(tokenId);
    const tokenTypeValue = this.computeTokenType(domainSep, contractAddress);
    
    // Transfer qua wallet, không qua contract
    const transferRecipe = await this.wallet.transferTransaction([
      {
        amount: 1n, // NFT value = 1
        type: tokenTypeValue,
        receiverAddress: recipientAddress
      }
    ]);
    
    return transferRecipe;
  }
  
  // Helper: Compute domain separator (giống logic trong contract)
  private computeDomainSep(tokenId: bigint): Uint8Array {
    // Implement hash logic tương tự contract
    // persistentHash([pad(32, "nft:collection:v1"), tokenId])
    // (Cần sử dụng crypto library tương ứng)
    return new Uint8Array(32); // placeholder
  }
  
  // Helper: Compute token type
  private computeTokenType(
    domainSep: Uint8Array,
    contractAddress: string
  ): Uint8Array {
    // token_type = hash(domainSep || contractAddress)
    // (Cần sử dụng tokenType function từ runtime)
    return new Uint8Array(32); // placeholder
  }
  
  // Burn NFT
  async burnNFT(
    tokenId: bigint,
    coinInfo: any
  ): Promise<any> {
    const tx = await this.contract.callTx.burnNFT(
      tokenId,
      coinInfo
    );
    
    return tx;
  }
  
  // Query total minted
  async getTotalMinted(): Promise<bigint> {
    const state = await this.providers.publicDataProvider
      .queryContractState(this.contract.address);
    
    return state.totalMinted;
  }
}

// Usage example
async function main() {
  const nftManager = new NFTManager();
  
  // 1. Deploy contract
  const contractAddress = await nftManager.deploy("My NFT Collection");
  console.log(`Contract deployed at: ${contractAddress}`);
  
  // 2. Mint NFT
  const tokenId = 1n;
  const recipient = "midnight1..."; // recipient address
  const nonce = new Uint8Array(32); // random nonce
  
  await nftManager.mintNFT(tokenId, recipient, nonce);
  console.log(`NFT #${tokenId} minted to ${recipient}`);
  
  // 3. Transfer NFT (không cần contract function)
  const newOwner = "midnight2...";
  await nftManager.transferNFT(tokenId, contractAddress, newOwner);
  console.log(`NFT #${tokenId} transferred to ${newOwner}`);
  
  // 4. Query state
  const total = await nftManager.getTotalMinted();
  console.log(`Total minted: ${total}`);
}