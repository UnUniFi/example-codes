function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const validatorAddress = properties.validator_address;

    const msg = new cosmosclient.proto.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward({
        delegator_address: currentAddressString,
        validator_address: validatorAddress,
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_withdraw_delegator_reward_type_url', msgAny.type_url);
    instance.publishState('msg_withdraw_delegator_reward_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_withdraw_delegator_reward_created');
}
