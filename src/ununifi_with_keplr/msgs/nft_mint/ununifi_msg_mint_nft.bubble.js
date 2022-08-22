function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const classId = properties.class_id;
  const nftId = properties.nft_id;
  const recipient = properties.recipient;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmint.MsgMintNFT({
    sender: account.address,
    class_id: classId,
    nft_id: nftId,
    recipient: recipient,
  });

  instance.data.msgs.push(msg);
}
