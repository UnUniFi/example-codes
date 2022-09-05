function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const classId = properties.class_id;
  const baseTokenUri = properties.base_token_uri;

  const updateBaseTokenUri = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new ununificlient.proto.ununifi.nftmint.MsgUpdateBaseTokenUri({
      sender: account.address,
      class_id: classId,
      base_token_uri: baseTokenUri,
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('base_token_uri_updated');
    console.log('txHash : ' + txHash);
  };
  updateBaseTokenUri();
}
