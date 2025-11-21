// scripts/mint-sim.js
import { Contract } from '../contract/managed/mint/contract/index.cjs';
import { constructorContext, QueryContext, sampleContractAddress } from '@midnight-ntwrk/compact-runtime';

async function run() {
  const contract = new Contract({} as any);

  // Khởi tạo composer state (giống deploy local)
  const initCtx = constructorContext({}, "ALICE_PUBLIC_KEY"); // hoặc use your private key wrapper
  let { currentPrivateState, currentContractState, currentZswapLocalState } = contract.initialState(initCtx);

  let ctx = {
    currentPrivateState,
    currentZswapLocalState,
    originalState: currentContractState,
    transactionContext: new QueryContext(currentContractState.data, sampleContractAddress())
  };

  // Gọi mintNFT (impureCircuit)
  const mintResult = contract.impureCircuits.mintNFT(ctx, Buffer.from("MyFirstNFT"), Buffer.from("ipfs://bafkreifgzgwifclf75l4x2vk65a35xx3do3yil2obgefn4sxmy5knfm2ba"));
  ctx = mintResult.context;

  // Đọc NFT
  const nftRead = contract.circuits.getNFT(ctx, 1n);
  console.log('NFT #1:', nftRead.result);

  // Read total
  const total = contract.circuits.getTotalSupply(ctx);
  console.log('Total NFTs:', total.result);
}

run().catch(console.error);
