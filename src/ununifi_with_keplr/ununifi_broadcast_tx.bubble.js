function(instance, properties, context) {
  const { fromHexString, txBuilder, sdk } = instance.data;
  const signedBodyHex = properties.signed_body_hex;
  const signedAuthInfoHex = properties.signed_auth_info_hex;
  const signature = properties.signature;

  txBuilder.txRaw.auth_info_bytes = fromHexString(signedAuthInfoHex);
  txBuilder.txRaw.body_bytes = fromHexString(signedBodyHex);
  txBuilder.addSignature(signature);

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
      instance.data.msgs = [];

      return callback(null, ret);
    } catch (err) {
      return callback(err);
    }
  });
  console.log({ result });

  instance.publishState('txhash', result.tx_response.txhash);
}
