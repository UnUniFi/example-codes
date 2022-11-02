function(instance, properties, context) {
    const { currentAddressString, toHexString } = instance.data;

    const contract = properties.contract;
    const executeMsgStr = properties.execute_msg_str;
    const amount = properties.amount;
    const denom = properties.denom;

    const msg = new cosmwasmclient.proto.cosmwasm.wasm.v1.MsgExecuteContract({
        sender: currentAddressString,
        contract: contract,
        msg: new TextEncoder().encode(executeMsgStr),
        funds: [{ amount: amount, denom: denom }],
    });

    instance.data.msgs = [msg];
    const msgAny = cosmosclient.codec.instanceToProtoAny(msg);
    instance.publishState('msg_execute_contract_type_url', msgAny.type_url);
    instance.publishState('msg_execute_contract_value', toHexString(msgAny.value));
    instance.triggerEvent('msg_execute_contract_created');
}
