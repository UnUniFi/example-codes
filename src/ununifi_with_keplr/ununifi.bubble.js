/**
 * @typedef {import("./../types").Context} Context
 * @typedef {import("./ununifi").UnUnifiInstance} UnUnifiInstance
 * @typedef {import("./ununifi").UnUnifiFields} UnUnifiFields
 */

/**
 * initialize
 * 
 * @param {UnUnifiInstance} instance
 * @param {Context} context
 */
function(instance, context) {
  instance.data.toHexString = (bytes) => {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  };

  instance.data.fromHexString = (hexString) => {
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  };

  instance.data.fetchAccount = (sdk, addressString) => {
    const address = cosmosclient.AccAddress.fromString(addressString);
    return context.async(async (callback) => {
      const account = await cosmosclient.rest.auth
        .account(sdk.rest, address)
        .then((res) => cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(res.data.account)))
        .catch((_) => undefined);

      if (!(account instanceof cosmosclient.proto.cosmos.auth.v1beta1.BaseAccount)) {
        return callback(new Error('not BaseAccount instance'), null);
      }

      return callback(null, account);
    });
  };
}

/**
 * update
 * 
 * @param {UnUnifiInstance} instance
 * @param {UnUnifiFields} properties
 * @param {Context} context
 */
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
