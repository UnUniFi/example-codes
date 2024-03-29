/**
 * initialize
 */
function(instance, context) {
  instance.data.toHexString = (bytes) => {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  };

  instance.data.fromHexString = (hexString) => {
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  };

  instance.data.fetchAccount = async (sdk, addressString) => {
    const address = cosmosclient.AccAddress.fromString(addressString);
    const account = await cosmosclient.rest.auth
      .account(sdk.rest, address)
      .then((res) => cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(res.data.account)))

    if (!(account instanceof cosmosclient.proto.cosmos.auth.v1beta1.BaseAccount)) {
      throw new Error('it is not BaseAccount instance');
    }

    return account;
  };

  // cosmosclient tx

  instance.data.createTx = (sdk, msgs, account) => {
    const txBody = new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
      messages: msgs.map((msg) => cosmosclient.codec.instanceToProtoAny(msg)),
    });
    const authInfo = new cosmosclient.proto.cosmos.tx.v1beta1.AuthInfo({
      signer_infos: [
        {
          public_key: account.pub_key,
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
    return txBuilder;
  };

  instance.data.createTxBody = (msgs) => {
    const txBody = new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
      messages: msgs.map((msg) => cosmosclient.codec.instanceToProtoAny(msg)),
    });
    return txBody;
  };

  instance.data.createAuthInfo = (account) => {
    return new cosmosclient.proto.cosmos.tx.v1beta1.AuthInfo({
      signer_infos: [
        {
          public_key: account.pub_key,
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
  };

  instance.data.broadcastTx = async (sdk, txBuilder) => {
    try {
      const result = await cosmosclient.rest.tx.broadcastTx(sdk.rest, {
        tx_bytes: txBuilder.txBytes(),
        mode: cosmosclient.rest.tx.BroadcastTxMode.Block,
      });

      if (result.data.tx_response?.code !== 0) {
        console.error(result.data.tx_response?.raw_log);
      }
      return result.data.tx_response.txhash;
    } catch (err) {
      throw err;
    }
  };

  // keplr

  instance.data.loginWithKeplr = async (chainId) => {
    try {
      await keplr.enable(chainId);
    } catch (err) {
      console.log(err);
      await keplr.experimentalSuggestChain(instance.data.chainInfo);
      await keplr.enable(chainId);
    }
    const key = await keplr.getKey(chainId);
    instance.data.currentAddressString = key.bech32Address;
    instance.data.publicKeyHexString = instance.data.toHexString(key.pubKey)

    localStorage.setItem('ununifiAddress', key.bech32Address);
    localStorage.setItem('ununifiPubkey', instance.data.toHexString(key.pubKey));
  }

  instance.data.signWithKeplr = async (chainId, account, txBuilder) => {
    const signDoc = txBuilder.signDoc(account.account_number);
    const bodyBytes = signDoc.body_bytes;
    const authInfoBytes = signDoc.auth_info_bytes;
    await keplr.enable(chainId);
    const signResponse = await keplr.signDirect(chainId, account.address, {
      bodyBytes,
      authInfoBytes,
      chainId,
      accountNumber: account.account_number,
    });

    txBuilder.txRaw.auth_info_bytes = signResponse.signed.authInfoBytes;
    txBuilder.txRaw.body_bytes = signResponse.signed.bodyBytes;
    txBuilder.addSignature(signResponse.signature.signature);
    return txBuilder;
  };

  instance.data.getPersisted = () => {
    return {
      address: localStorage.getItem('ununifiAddress'),
      pubkey: localStorage.getItem('ununifiPubkey'),
    };
  };

  instance.data.removePersisted = () => {
    localStorage.removeItem('ununifiPubkey');
    localStorage.removeItem('ununifiAddress');
    instance.data.publicKeyHexString = '';
    instance.data.currentAddressString = '';
  };

  const persisted = instance.data.getPersisted();
  instance.data.publicKeyHexString = persisted.pubkey;
  instance.data.currentAddressString = persisted.address;

  window.addEventListener('keplr_keystorechange', () => {
    const persisted = instance.data.getPersisted();
    if (persisted.address) {
      instance.data.removePersisted();
    }
  });
}

/**
 * update
 */
 function(instance, properties, context) {
  instance.data.chainId = properties.chain_id;
  instance.data.chainInfo = createChainInfo(properties);
  instance.data.bech32Prefix = properties.bech32_prefix;

  const rest = properties.rest;
  const chainId = properties.chain_id;
  const websocket = properties.websocket;
  const bech32Prefix = properties.bech32_prefix;

  cosmosclient.config.setBech32Prefix(createBech32PrefixConfig(bech32Prefix));

  instance.data.sdk = createSdk(chainId, rest, websocket);

  //
  // subroutine
  //
  function createChainInfo(properties) {
    return {
      chainId: properties.chain_id,
      chainName: properties.chain_name,
      rpc: properties.websocket,
      rest: properties.rest,
      bip44: {
        coinType: properties.coin_type,
      },
      bech32Config: createBech32PrefixConfig(properties),
      currencies: createCurrencies(properties),
      feeCurrencies: createCurrencies(properties),
      stakeCurrency: createCurrencies(properties)[0],
      coinType: properties.coin_type,
      gasPriceStep: {
        low: properties.gas_price_step_low,
        average: properties.gas_price_step_average,
        high: properties.gas_price_step_high,
      },
    };
  }

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

  function createCurrencies(properties) {
    return [
      {
        coinDenom: properties.coin_denom,
        coinMinimalDenom: properties.coin_minimal_denom,
        coinDecimals: properties.coin_decimals,
        coinGeckoId: properties.coin_gecko_id,
      },
    ];
  }

  function createSdk(chainId, rest, websocket) {
    const restApi = new cosmosclient.CosmosSDK(rest, chainId);
    const websocketApi = new cosmosclient.CosmosSDK(websocket, chainId);
    const sdk = { rest: restApi, websocket: websocketApi };
    return sdk;
  }
}
