function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const validatorAddress = properties.validator_address;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmosclient.proto.cosmos.staking.v1beta1.MsgDelegate({
        delegator_address: currentAddressString,
        validator_address: validatorAddress,
        amount: { denom: denom, amount: amount },
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_delegate_type_url', msgAny.type_url);
    instance.publishState('msg_delegate_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_delegate_created');
}
