function(instance, properties, context) {
  instance.data.bech32Prefix = properties.bech32_prefix;
  instance.data.publicKeyHexString = properties.public_key_hex;
  instance.data.currentAddressString = properties.address;

  const rest = properties.rest;
  const chainId = properties.chain_id;
  const websocket = properties.websocket;
  const bech32Prefix = properties.bech32_prefix;

  cosmosclient.config.setBech32Prefix(createBech32PrefixConfig(bech32Prefix));

  instance.data.sdk = createSdk(chainId, rest, websocket);

  //
  // subroutine
  //
  function createBech32PrefixConfig(bech32Prefix) {
    return {
      accAddr: bech32Prefix,
      accPub: bech32Prefix + 'pub',
      valAddr: bech32Prefix + 'valoper',
      valPub: bech32Prefix + 'valoperpub',
      consAddr: bech32Prefix + 'valcons',
      consPub: bech32Prefix + 'valconspub',
    };
  }

  function createSdk(chainId, rest, websocket) {
    const restApi = new cosmosclient.CosmosSDK(rest, chainId);
    const websocketApi = new cosmosclient.CosmosSDK(websocket, chainId);
    const sdk = { rest: restApi, websocket: websocketApi };
    return sdk;
  }
}
