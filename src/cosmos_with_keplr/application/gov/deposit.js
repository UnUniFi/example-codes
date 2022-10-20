function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const proposalID = properties.proposal_id;
  const amount = properties.amount;
  const denom = properties.denom;

  const deposit = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new cosmosclient.proto.cosmos.gov.v1.MsgDeposit({
      proposal_id: Long.fromNumber(proposalID),
      depositor: account.address,
      amount: [{ denom: denom, amount: amount }],
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('deposited');
    console.log('txHash : ' + txHash);
  };
  deposit();
}
