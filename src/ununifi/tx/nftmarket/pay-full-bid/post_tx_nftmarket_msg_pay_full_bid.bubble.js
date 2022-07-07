/* eslint-disable */
function(properties, context) {
  //Define functions
  function createBech32PrefixConfig(properties) {
    return {
      accAddr: properties.bech32Prefix,
      accPub: properties.bech32Prefix + cosmosclient.AddressPrefix.Public,
      valAddr: properties.bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator,
      valPub:
        properties.bech32Prefix +
        cosmosclient.AddressPrefix.Validator +
        cosmosclient.AddressPrefix.Operator +
        cosmosclient.AddressPrefix.Public,
      consAddr: properties.bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus,
      consPub:
        properties.bech32Prefix +
        cosmosclient.AddressPrefix.Validator +
        cosmosclient.AddressPrefix.Consensus +
        cosmosclient.AddressPrefix.Public,
    };
  }

  function createCurrencies(properties) {
    return [
      {
        coinDenom: properties.coinDenom,
        coinMinimalDenom: properties.coinMinimalDenom,
        coinDecimals: properties.coinDecimals,
        coinGeckoId: properties.coinGeckoId,
      },
    ];
  }

  function createChainInfo(properties) {
    return {
      chainId: properties.chainId,
      chainName: properties.chainName,
      rpc: properties.websocket,
      rest: properties.rest,
      bip44: {
        coinType: properties.coinType,
      },
      bech32Config: createBech32PrefixConfig(properties),
      currencies: createCurrencies(properties),
      feeCurrencies: createCurrencies(properties),
      stakeCurrency: createCurrencies(properties)[0],
      coinType: properties.coinType,
      gasPriceStep: {
        low: properties.gasPriceStepLow,
        average: properties.gasPriceStepAverage,
        high: properties.gasPriceStepHigh,
      },
    };
  }

  function fromHexString(hexString) {
    console.log(hexString);
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  }

  function toHexString(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  }

  function base64StringToUint8Array(base64String) {
    const raw = atob(base64String);
    return Uint8Array.from(
      Array.prototype.map.call(raw, (x) => {
        return x.charCodeAt(0);
      }),
    );
  }

  //Define constants and client
  const restApi = new cosmosclient.CosmosSDK(properties.rest, properties.chainId);
  const websocketApi = new cosmosclient.CosmosSDK(properties.websocket, properties.chainId);
  const sdk = { rest: restApi, websocket: websocketApi };
  const bech32Config = createBech32PrefixConfig(properties);
  const chainInfo = createChainInfo(properties);
  cosmosclient.config.setBech32Prefix(bech32Config);

  //Suggest chain to Keplr
  context.async(async (callback) => {
    await window.keplr.enable(properties.chainId);
    await window.keplr.experimentalSuggestChain(chainInfo);
    callback(null, null);
  });

  //Get account info from Keplr
  const keyFromKeplr = context.async(async (callback) => {
    await window.keplr.enable(properties.chainId);
    const publicKeyFromKeplr = await window.keplr.getKey(properties.chainId);
    callback(null, publicKeyFromKeplr);
  });
  const publicKeyFromKeplr = keyFromKeplr.pubKey;
  console.log(publicKeyFromKeplr);
  const publicKeyHexString = toHexString(publicKeyFromKeplr);
  console.log(publicKeyHexString);
  const fromAddressString = keyFromKeplr.bech32Address;
  console.log(fromAddressString);

  // console.log(properties.fromPubKey);
  const fromPubKey = fromHexString(publicKeyHexString);
  const fromAddress = cosmosclient.AccAddress.fromString(fromAddressString);
  const pubKey = new cosmosclient.proto.cosmos.crypto.secp256k1.PubKey({
    key: fromPubKey,
  });

  //Do the operation
  const account = context.async(async (callback) => {
    const account = await cosmosclient.rest.auth
      .account(sdk.rest, fromAddress)
      .then((res) => cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(res.data.account)))
      .catch((_) => undefined);

    if (!(account instanceof cosmosclient.proto.cosmos.auth.v1beta1.BaseAccount)) {
      console.log(account);
      callback(null, null);
    }

    console.log(account);
    callback(null, account);
  });

  const msg = new ununificlient.proto.ununifi.nftmarket.MsgPayFullBid({
    sender: fromAddress.toString(),
    nft_id: {
      class_id: properties.classId,
      nft_id: properties.nftId,
    },
  });


  const txBody = new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msg)],
  });

  const authInfo = new cosmosclient.proto.cosmos.tx.v1beta1.AuthInfo({
    signer_infos: [
      {
        public_key: cosmosclient.codec.instanceToProtoAny(pubKey),
        mode_info: {
          single: {
            mode: cosmosclient.proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
          },
        },
        sequence: account.sequence,
      },
    ],
    fee: {
      gas_limit: Long.fromString('200000'),
    },
  });

  const txBuilder = new cosmosclient.TxBuilder(sdk, txBody, authInfo);

  const signDoc = txBuilder.signDoc(account.account_number);

  const bodyBytes = signDoc.body_bytes;
  const authInfoBytes = signDoc.auth_info_bytes;
  const accountNumber = account.account_number;

  const directSignResponse = context.async(async (callback) => {
    await window.keplr.enable(properties.chainId);
    const directSignResponse = await window.keplr.signDirect(properties.chainId, fromAddress, {
      bodyBytes,
      authInfoBytes,
      chainId: properties.chainId,
      accountNumber,
    });
    callback(null, directSignResponse);
  });

  txBuilder.txRaw.auth_info_bytes = directSignResponse.signed.authInfoBytes;
  txBuilder.txRaw.body_bytes = directSignResponse.signed.bodyBytes;
  txBuilder.addSignature(base64StringToUint8Array(directSignResponse.signature.signature));

  const result = context.async(async (callback) => {
    try {
      const result = await cosmosclient.rest.tx.broadcastTx(sdk.rest, {
        tx_bytes: txBuilder.txBytes(),
        mode: cosmosclient.rest.tx.BroadcastTxMode.Block,
      });

      if (result.data.tx_response?.code !== 0) {
        console.error(result.data.tx_response?.raw_log);
      }

      const ret = result.data;

      callback(null, ret);
    } catch (err) {
      callback(err);
    }
  });
  console.log(result);
}
