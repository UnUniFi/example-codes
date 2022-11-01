function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const contract = properties.contract;
    const codeId = properties.code_id;
    const migrateMsgStr = properties.migrate_msg_str;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgExecuteContract({
        sender: currentAddressString,
        contract: contract,
        code_id: Long.fromString(codeId),
        msg: new TextEncoder().encode(migrateMsgStr),
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_migrate_contract_type_url', msgAny.type_url);
    instance.publishState('msg_migrate_contract_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_migrate_contract_created');
}
