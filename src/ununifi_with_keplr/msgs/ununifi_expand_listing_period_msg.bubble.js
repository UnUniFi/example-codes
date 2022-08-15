function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const nftId = properties.nft_id;
  const classId = properties.class_id;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmarket.MsgExpandListingPeriod({
    sender: account.address,
    nft_id: {
      class_id: classId,
      nft_id: nftId,
    },
  });

  instance.data.msgs.push(msg);
}
