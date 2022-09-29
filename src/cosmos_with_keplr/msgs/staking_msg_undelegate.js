function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const validatorAddress = properties.validator_address;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmosclient.proto.cosmos.staking.v1beta1.MsgUndelegate({
        delegator_address: currentAddressString,
        validator_address: validatorAddress,
        amount: { denom: denom, amount: amount },
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_undelegate_type_url', msgAny.type_url);
    instance.publishState('msg_undelegate_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_undelegate_created');
}
