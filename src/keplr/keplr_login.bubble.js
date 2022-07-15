/**
 * login
 */
function(instance, properties, context) {
  const { toHexString } = instance.data;

  const { chainId, chainInfo } = instance.data;

  context.async(async (cb) => {
    try {
      await keplr.enable(chainId);
      cb(null, null);
    } catch (err) {
      console.log(err);
      await keplr.experimentalSuggestChain(chainInfo);
      await keplr.enable(chainId);
      cb(null, null);
    }
  });

  const key = context.async(async (cb) => {
    const key = await keplr.getKey(chainId);
    cb(null, key);
  });

  instance.data.address = key.bech32Address;
  instance.publishState('public_key', toHexString(key.pubKey));
  instance.publishState('address', key.bech32Address);
}
