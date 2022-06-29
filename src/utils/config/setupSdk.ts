import { cosmosclient } from '@cosmos-client/core';
const setupBech = () => {
  const bech32Prefix = 'ununifi';
  const accAddr = bech32Prefix;
  const accPub = bech32Prefix + cosmosclient.AddressPrefix.Public;
  const valAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator;
  const valPub =
    bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator + cosmosclient.AddressPrefix.Public;
  const consAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus;
  const consPub =
    bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus + cosmosclient.AddressPrefix.Public;
  const bech32PrefixConfig = {
    accAddr,
    accPub,
    valAddr,
    valPub,
    consAddr,
    consPub,
  };
  cosmosclient.config.setBech32Prefix(bech32PrefixConfig);
}

const setupChainInfo = (chainID: string, restURL: string,websocketURL: string) => {
  const restApi = new cosmosclient.CosmosSDK(restURL, chainID);
  const websocketApi = new cosmosclient.CosmosSDK(websocketURL, chainID);
  return {
    rest: restApi,
    websocket: websocketApi,
  };
}

export const setupCosmosClient = (chainID: string, restURL: string,websocketURL: string) => {
  setupBech()
  return setupChainInfo(chainID, restURL,websocketURL)
}
