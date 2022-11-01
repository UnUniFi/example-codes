function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const admin = properties.admin;
    const codeId = properties.code_id;
    const label = properties.label;
    const initMsgStr = properties.init_msg_str;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgInstantiateContract({
        sender: currentAddressString,
        admin: admin,
        code_id: Long.fromString(codeId),
        label: label,
        msg: new TextEncoder().encode(initMsgStr),
        funds: [{ amount: amount, denom: denom }],
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_instantiate_contract_type_url', msgAny.type_url);
    instance.publishState('msg_instantiate_contract_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_instantiate_contract_created');
}