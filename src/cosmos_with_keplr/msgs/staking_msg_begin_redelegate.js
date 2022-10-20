function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

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
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_begin_redelegate_type_url', msgAny.type_url);
    instance.publishState('msg_begin_redelegate_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_begin_redelegate_created');
}
