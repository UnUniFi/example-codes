function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const channel = properties.channel;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgIBCCloseChannel({
        channel: channel
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_ibc_close_channel_type_url', msgAny.type_url);
    instance.publishState('msg_ibc_close_channel_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_ibc_close_channel_created');
}
