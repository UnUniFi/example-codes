function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const classId = properties.class_id;
  const baseTokenUri = properties.base_token_uri;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmint.MsgUpdateBaseTokenUri({
    sender: account.address,
    class_id: classId,
    base_token_uri:baseTokenUri
  });

  instance.data.msgs.push(msg);
}