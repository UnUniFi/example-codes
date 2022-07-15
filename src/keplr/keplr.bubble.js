/**
 * @typedef {import("./../types").Context} Context
 * @typedef {import("./keplr").Instance} Instance
 * @typedef {import("./keplr").Data} Data
 * @typedef {import("./keplr").Fields} Fields
 */

/**
 * initialize
 * 
 * @param {Instance} instance
 * @param {Context} context
 */
function(instance, context) {
  console.log('init');

  instance.data.toHexString = (bytes) => {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  };

  instance.data.fromHexString = (hexString) => {
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  };
}

/**
 * update
 * 
 * @param {Instance} instance
 * @param {Fields} properties
 * @param {Context} context
 */
function(instance, properties, context) {
  console.log('update');

  instance.data.chainId = properties.chain_id;
  instance.data.chainInfo = createChainInfo(properties);
  instance.publishState('chain_id', properties.chain_id);

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

  function createBech32PrefixConfig(properties) {
    return {
      bech32PrefixAccAddr: properties.bech32_prefix,
      bech32PrefixAccPub: properties.bech32_prefix + 'pub',
      bech32PrefixValAddr: properties.bech32_prefix + 'valoper',
      bech32PrefixValPub: properties.bech32_prefix + 'valoperpub',
      bech32PrefixConsAddr: properties.bech32_prefix + 'valcons',
      bech32PrefixConsPub: properties.bech32_prefix + 'valconspub',
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
}
