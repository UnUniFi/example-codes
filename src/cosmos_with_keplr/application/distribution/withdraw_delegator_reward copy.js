function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const validatorAddress = properties.validator_address;

  const withdrawDelegatorReward = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new cosmosclient.proto.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward({
      delegator_address: account.address,
      validator_address: validatorAddress,
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('withdrew_delegator_reward');
    console.log('txHash : ' + txHash);
  };
  withdrawDelegatorReward();
}
