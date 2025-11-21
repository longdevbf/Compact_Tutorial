import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type SimpleNFT = { id: bigint;
                          name: Uint8Array;
                          owner: { bytes: Uint8Array };
                          uri: Uint8Array
                        };

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  mintNFT(context: __compactRuntime.CircuitContext<T>,
          name_0: Uint8Array,
          uri_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  getNFT(context: __compactRuntime.CircuitContext<T>, id_0: bigint): __compactRuntime.CircuitResults<T, SimpleNFT>;
  getTotalSupply(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, bigint>;
  transferNFT(context: __compactRuntime.CircuitContext<T>,
              id_0: bigint,
              to_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  burnNFT(context: __compactRuntime.CircuitContext<T>, id_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  mintNFT(context: __compactRuntime.CircuitContext<T>,
          name_0: Uint8Array,
          uri_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  getNFT(context: __compactRuntime.CircuitContext<T>, id_0: bigint): __compactRuntime.CircuitResults<T, SimpleNFT>;
  getTotalSupply(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, bigint>;
  transferNFT(context: __compactRuntime.CircuitContext<T>,
              id_0: bigint,
              to_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  burnNFT(context: __compactRuntime.CircuitContext<T>, id_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  nfts: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): SimpleNFT;
    [Symbol.iterator](): Iterator<[bigint, SimpleNFT]>
  };
  readonly totalSupply: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
