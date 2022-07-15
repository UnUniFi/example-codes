import { DefineInstance } from '../types';

export type UnUnifiFields = {
  bech32_prefix: string;
  public_key_hex: string;
  address: string;
  rest: string;
  chain_id: string;
  websocket: string;
};

export type UnUnifiData = {
  toHexString: (value: any) => string;
  fromHexString: (value: string) => any;
  fetchAccount: (sdk: any, addressString: string) => any;
  bech32Prefix: string;
  publicKeyHexString: string;
  currentAddressString: string;
  sdk: any;
  msgs: any[];
};

export type UnUnifiInstance = DefineInstance<UnUnifiData>;
