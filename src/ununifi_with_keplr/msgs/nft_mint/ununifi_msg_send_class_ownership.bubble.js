function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const classId = properties.class_id;
  const recipient = properties.recipient;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmint.MsgSendClassOwnership({
    sender: account.address,
    class_id: classId,
    recipient: recipient,
  });

  instance.data.msgs.push(msg);
}
