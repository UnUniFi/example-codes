function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const wasmByteCodeStr = properties.wasm_byte_code_str;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgStoreCode({
        sender: currentAddressString,
        wasm_byte_code:new TextEncoder().encode(wasmByteCodeStr),
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_store_code_type_url', msgAny.type_url);
    instance.publishState('msg_store_code_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_store_code_created');
}