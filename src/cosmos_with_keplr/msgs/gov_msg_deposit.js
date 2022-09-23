function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const proposalID = properties.proposal_id;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmosclient.proto.cosmos.gov.v1.MsgDeposit({
        proposal_id: Long.fromNumber(proposalID),
        depositor: currentAddressString,
        amount: [{ denom: denom, amount: amount }],
    });

    instance.data.msgs = [msg];
    instance.triggerEvent('msg_deposit_created');
}
