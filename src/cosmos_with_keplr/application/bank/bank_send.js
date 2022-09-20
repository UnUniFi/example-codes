function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const toAddress = properties.to_address;
  const amount = properties.amount;
  const denom = properties.denom;

  const bankSend = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new cosmosclient.proto.cosmos.bank.v1beta1.MsgSend({
      from_address: account.address,
      to_address: toAddress,
      amount: [{ denom: denom, amount: amount }],
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('bank_sent');
    console.log('txHash : ' + txHash);
  };
  bankSend();
}
