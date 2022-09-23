function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const proposalID = properties.proposal_id;
  const voteOptionNum = properties.vote_option;
  let voteOption;
  if (voteOptionNum == 1) {
    voteOption = cosmosclient.proto.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_YES;
  } else if (voteOptionNum == 2) {
    voteOption = cosmosclient.proto.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_ABSTAIN;
  } else if (voteOptionNum == 3) {
    voteOption = cosmosclient.proto.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO;
  } else if (voteOptionNum == 4) {
    voteOption = cosmosclient.proto.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO_WITH_VETO;
  } else {
    voteOption = cosmosclient.proto.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_UNSPECIFIED;
  }

  const vote = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new cosmosclient.proto.cosmos.gov.v1.MsgVote({
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
