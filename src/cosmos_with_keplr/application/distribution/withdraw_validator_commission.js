function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const withdrawValidatorCommission = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const accAddress = cosmosclient.AccAddress.fromString(account.address);
    const validatorAddress = accAddress.toValAddress().toString();

    const msg = new cosmosclient.proto.cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission({
      validator_address: validatorAddress,
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('withdrew_validator_commission');
    console.log('txHash : ' + txHash);
  };
  withdrawValidatorCommission();
}
