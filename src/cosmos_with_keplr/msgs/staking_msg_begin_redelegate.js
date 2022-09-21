function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const validatorSrcAddress = properties.validator_src_address;
    const validatorDstAddress = properties.validator_dst_address;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmosclient.proto.cosmos.staking.v1beta1.MsgBeginRedelegate({
        delegator_address: currentAddressString,
        validator_src_address: validatorSrcAddress,
        validator_dst_address: validatorDstAddress,
        amount: { denom: denom, amount: amount },
    });

    instance.data.msgs = [msg];
    instance.triggerEvent('msg_begin_redelegate_created');
}
