function(instance, properties, context) {
    const { currentAddressString } = instance.data;

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

    const msg = new cosmosclient.proto.cosmos.gov.v1.MsgVote({
        proposal_id: Long.fromNumber(proposalID),
        voter: currentAddressString,
        option: voteOption,
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_vote_type_url', msgAny.type_url);
    instance.publishState('msg_vote_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_vote_created');
}
