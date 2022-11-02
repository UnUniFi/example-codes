function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const channel = properties.channel;
    const timeoutHeight = properties.timeout_height;
    const timeoutTimestamp = properties.timeout_timestamp;
    const dataStr = properties.data_str;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgIBCSend({
        channel: channel,
        timeout_height: Long.fromString(timeoutHeight),
        timeout_timestamp: Long.fromNumber(timeoutTimestamp.getTime()),
        data: new TextEncoder().encode(dataStr),
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_ibc_send_type_url', msgAny.type_url);
    instance.publishState('msg_ibc_send_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_ibc_send_created');
}
