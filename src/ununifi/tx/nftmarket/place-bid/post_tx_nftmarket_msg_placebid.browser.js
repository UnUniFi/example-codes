/* eslint-disable */
const properties = {};
// Note: These value should be set by plugin or app developer.
properties.chainId = 'ununifi-alpha-test-v2';
properties.chainName = 'UnUniFi (alpha-test)';
properties.bech32Prefix = 'ununifi';
properties.coinType = 118;
properties.gasPriceStepLow = 0;
properties.gasPriceStepAverage = 0.01;
properties.gasPriceStepHigh = 0.03;
properties.coinDenom = 'GUU';
properties.coinMinimalDenom = 'uguu';
properties.coinDecimals = 6;
properties.coinGeckoId = 'ununifi';
properties.rest = 'http://ununifi-alpha-test-v2.cauchye.net:1317';
properties.websocket = 'ws://ununifi-alpha-test-v2.cauchye.net:26657';

// Note: These example values should be set from form input.
// properties.toAddress = 'ununifi18y5nnx3r9s4w398sn0nqcykh2y7sx8ljd423t6';
// properties.denom = 'uguu';
// properties.amount = '10';

// Note: This function emulate Bubble specific context.async. But I guess you can improve more.
function callback(arg1, arg2) {
  console.log(arg1);
  console.log(arg2);
  if (arg2) {
    return arg2;
  }
  return;
}

// Note: This object and function emulate Bubble specific context.async. But I guess you can improve more.
const context = {};
context.async = async function (fn) {
  const callbackResult = await fn(callback);
  console.log(callbackResult);
  return callbackResult;
};

// Note: You could be written more reasonably, depending on the definition of context.async
// Note: After copying to Bubble, you need to delete the following points.
// Note: 1. You need to remove main function's async and function name.
// Note: 2. You need to remove async just before `context.async`.
// Note: 3. You need to remove return just before `callback(null, null or hoge)`.
async function post_tx_nftmarket_msg_placebid(properties, context) {
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
  await context.async(async (callback) => {
    if (!window.keplr) {
      alert('Please install keplr extension');
      return;
    }
    await window.keplr.enable(properties.chainId);
    await window.keplr.experimentalSuggestChain(chainInfo);
    return callback(null, null);
  });

  //Get account info from Keplr
  const keyFromKeplr = await context.async(async (callback) => {
    await window.keplr.enable(properties.chainId);
    const publicKeyFromKeplr = await window.keplr.getKey(properties.chainId);
    return callback(null, publicKeyFromKeplr);
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
  const account = await context.async(async (callback) => {
    const account = await cosmosclient.rest.auth
      .account(sdk.rest, fromAddress)
      .then((res) => cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(res.data.account)))
      .catch((_) => undefined);

    if (!(account instanceof cosmosclient.proto.cosmos.auth.v1beta1.BaseAccount)) {
      console.log(account);
      return callback(null, null);
    }

    console.log(account);
    return callback(null, account);
  });

  console.log({
    sender: fromAddress.toString(),
    nft_id: {
      class_id: properties.nft_id,
      nft_id: properties.nft_id,
    },
    amount: {
      denom: properties.denom,
      amount: properties.amount,
    },
    automatic_payment: properties.auto,
  });

  const msg = new ununificlient.proto.ununifi.nftmarket.MsgPlaceBid({
    sender: fromAddress.toString(),
    nft_id: {
      class_id: properties.nft_id,
      nft_id: properties.nft_id,
    },
    amount: {
      denom: properties.denom,
      amount: properties.amount,
    },
    automatic_payment: properties.auto,
  });

  const txBody = new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msg)],
    memo: '',
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

  // signWithKeplr
  const bodyBytes = signDoc.body_bytes;
  const authInfoBytes = signDoc.auth_info_bytes;
  const accountNumber = account.account_number;

  const directSignResponse = await context.async(async (callback) => {
    await window.keplr.enable(properties.chainId);
    const directSignResponse = await window.keplr.signDirect(properties.chainId, fromAddress, {
      bodyBytes,
      authInfoBytes,
      chainId: properties.chainId,
      accountNumber,
    });
    return callback(null, directSignResponse);
  });

  txBuilder.txRaw.auth_info_bytes = directSignResponse.signed.authInfoBytes;
  txBuilder.txRaw.body_bytes = directSignResponse.signed.bodyBytes;
  txBuilder.addSignature(base64StringToUint8Array(directSignResponse.signature.signature));

  const result = await context.async(async (callback) => {
    try {
      const result = await cosmosclient.rest.tx.broadcastTx(sdk.rest, {
        tx_bytes: txBuilder.txBytes(),
        mode: cosmosclient.rest.tx.BroadcastTxMode.Block,
      });

      if (result.data.tx_response?.code !== 0) {
        console.error(result.data.tx_response?.raw_log);
      }

      const ret = result.data;

      return callback(null, ret);
    } catch (err) {
      return callback(err);
    }
  });
  console.log(result);
}

async function onClickPostTxNftMsgPlaceBid() {
  properties.nft_id = document.getElementById('nft_id').value;
  properties.amount = document.getElementById('amount').value;
  properties.denom = document.getElementById('denom').value;
  properties.auto = document.getElementById('auto').checked;
  await post_tx_nftmarket_msg_placebid(properties, context);
}
