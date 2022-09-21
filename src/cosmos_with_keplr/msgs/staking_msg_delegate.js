function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const validatorAddress = properties.validator_address;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmosclient.proto.cosmos.staking.v1beta1.MsgDelegate({
        delegator_address: currentAddressString,
        validator_address: validatorAddress,
        amount: { denom: denom, amount: amount },
    });

    instance.data.msgs = [msg];
    instance.triggerEvent('msg_delegate_created');
}
