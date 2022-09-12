function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const validatorSrcAddress = properties.validator_src_address;
  const validatorDstAddress = properties.validator_dst_address;
  const amount = properties.amount;
  const denom = properties.denom;

  const beginRedelegate = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new cosmosclient.proto.cosmos.staking.v1beta1.MsgBeginRedelegate({
      delegator_address: account.address,
      validator_src_address: validatorSrcAddress,
      validator_dst_address:validatorDstAddress,
      amount: { denom: denom, amount: amount },
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('began_redelegate');
    console.log('txHash : ' + txHash);
  };
  beginRedelegate();
}
