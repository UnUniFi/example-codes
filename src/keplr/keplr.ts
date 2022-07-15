import { DefineInstance } from '../types';

export type Fields = {
  chain_id: string;
  chain_name: string;
  websocket: string;
  rest: string;
  coin_type: string;
  gas_price_step_low: string;
  gas_price_step_average: string;
  gas_price_step_high: string;
  bech32_prefix: string;
  coin_denom: string;
  coin_minimal_denom: string;
  coin_gecko_id: string;
};

export type Data = {
  toHexString: (value: any) => string;
  fromHexString: (value: string) => any;
  chainId: string;
  chainInfo: any;
  address?: string;
};

export type Instance = DefineInstance<Data>;

export type SignFields = {
  authInfoHex: string;
  bodyHex: string;
  accountNumString: string;
};

export type LoginFields = {};
