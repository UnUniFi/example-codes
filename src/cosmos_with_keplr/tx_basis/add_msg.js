function(instance, properties, context) {
    const { fromHexString } = instance.data;
    const typeURL = properties.type_url;
    const valueBuf = fromHexString(properties.value);
    const msg = new cosmosclient.proto.google.protobuf.Any({ type_url: typeURL, value: valueBuf });
    instance.data.msgs = [msg];
}
