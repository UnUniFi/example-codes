function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const classId = properties.class_id;
  const tokenSupplyCap = properties.token_supply_cap;

  const updateTokenSupplyCap = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new ununificlient.proto.ununifi.nftmint.MsgUpdateTokenSupplyCap({
      sender: account.address,
      class_id: classId,
      token_supply_cap: Long.fromString(tokenSupplyCap),
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('token_supply_cap_updated');
    console.log('txHash : ' + txHash);
  };
  updateTokenSupplyCap();
}
