function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const proposalID = properties.proposal_id;
  const voteOption = properties.vote_option;

  const vote = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new cosmosclient.proto.cosmos.gov.v1beta1.MsgVote({
      proposal_id: Long.fromNumber(proposalID),
      voter: account.address,
      option: voteOption,
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('voted');
    console.log('txHash : ' + txHash);
  };
  vote();
}
