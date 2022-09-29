function(instance, properties, context) {
    const { fromHexString, txBuilder, sdk } = instance.data;
    const signedBodyHex = properties.signed_body_hex;
    const signedAuthInfoHex = properties.signed_auth_info_hex;
    const signature = properties.signature;

    txBuilder.txRaw.auth_info_bytes = fromHexString(signedAuthInfoHex);
    txBuilder.txRaw.body_bytes = fromHexString(signedBodyHex);
    txBuilder.addSignature(signature);

    const broadcastTx = async () => {
        try {
            const result = await cosmosclient.rest.tx.broadcastTx(sdk.rest, {
                tx_bytes: txBuilder.txBytes(),
                mode: cosmosclient.rest.tx.BroadcastTxMode.Block,
            });

            if (result.data.tx_response?.code !== 0) {
                throw Error(result.data.tx_response?.raw_log);
            }
            const ret = result.data;
            instance.publishState("tx_hash", ret.tx_response.txhash);
        } catch (error) {
            instance.publishState("error", ret.tx_response?.raw_log.toString());
            instance.triggerEvent("error");
        } finally {
            console.log('broadcasted!');
            instance.data.msgs = [];
            instance.publishState("body_hex", "");
            instance.publishState("auth_info_hex", "");
            instance.publishState("account_number_str", "");
            instance.triggerEvent("broadcasted");
        }
    };

    broadcastTx();
}
