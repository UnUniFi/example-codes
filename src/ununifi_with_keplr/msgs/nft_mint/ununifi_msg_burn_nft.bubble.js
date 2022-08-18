function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const classId = properties.class_id;
  const nftId = properties.nft_id;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmint.MsgBurnNFT({
    sender: account.address,
    class_id: classId,
    nft_id: nftId,
  });

  instance.data.msgs.push(msg);
}
