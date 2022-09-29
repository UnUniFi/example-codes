function(instance, properties, context) {
    const { fromHexString } = instance.data;
    const typeURL = properties.type_url;
    const valueBuf = fromHexString(properties.value);
    const msgAny = new cosmosclient.proto.google.protobuf.Any({ type_url: typeURL, value: valueBuf });
    const msg = cosmosclient.codec.protoAnyToInstance(msgAny);
    instance.data.msgs = [msg];
}