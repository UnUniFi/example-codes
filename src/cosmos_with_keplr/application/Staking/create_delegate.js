function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const validatorAddress = properties.validator_address;
  const amount = properties.amount;
  const denom = properties.denom;

  const createDelegate = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new cosmosclient.proto.cosmos.staking.v1beta1.MsgDelegate({
      delegator_address: account.address,
      validator_address: validatorAddress,
      amount: { denom: denom, amount: amount },
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('created_delegate');
    console.log('txHash : ' + txHash);
  };
  createDelegate();
}
