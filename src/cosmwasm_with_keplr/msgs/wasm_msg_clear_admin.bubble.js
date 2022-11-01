function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const contract = properties.contract;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgClearAdmin({
        sender: currentAddressString,
        contract: contract,
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_clear_admin_type_url', msgAny.type_url);
    instance.publishState('msg_clear_admin_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_clear_admin_created');
}
