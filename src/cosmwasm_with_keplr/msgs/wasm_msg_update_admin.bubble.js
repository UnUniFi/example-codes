function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const newAdmin = properties.new_admin;
    const contract = properties.contract;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgUpdateAdmin({
        sender: currentAddressString,
        new_admin: newAdmin,
        contract: contract,
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_update_admin_type_url', msgAny.type_url);
    instance.publishState('msg_update_admin_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_update_admin_created');
}
