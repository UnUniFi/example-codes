function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const proposalID = properties.proposal_id;
    const voteOption = properties.vote_option;

    const msg = new cosmosclient.proto.cosmos.gov.v1beta1.MsgVote({
        proposal_id: Long.fromNumber(proposalID),
        voter: currentAddressString,
        option: voteOption,
    });

    instance.data.msgs = [msg];
    instance.triggerEvent('msg_vote_created');
}
