function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const toAddress = properties.to_address;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmosclient.proto.cosmos.bank.v1beta1.MsgSend({
        from_address: currentAddressString,
        to_address: toAddress,
        amount: [{ denom: denom, amount: amount }],
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_send_type_url', msgAny.type_url);
    instance.publishState('msg_send_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_send_created');
}
