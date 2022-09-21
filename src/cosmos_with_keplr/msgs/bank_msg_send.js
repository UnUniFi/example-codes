function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const toAddress = properties.to_address;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmosclient.proto.cosmos.bank.v1beta1.MsgSend({
        from_address: currentAddressString,
        to_address: toAddress,
        amount: [{ denom: denom, amount: amount }],
    });

    instance.data.msgs = [msg];
    instance.triggerEvent('msg_send_created');
}
