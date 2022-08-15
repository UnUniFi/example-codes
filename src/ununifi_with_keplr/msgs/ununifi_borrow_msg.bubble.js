function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const nftId = properties.nft_id;
  const classId = properties.class_id;
  const denom = properties.denom;
  const amount = properties.amount;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmarket.MsgBorrow({
    sender: account.address,
    nft_id: {
      class_id: classId,
      nft_id: nftId,
    },
    amount: {
      denom: denom,
      amount: amount,
    },
  });

  instance.data.msgs.push(msg);
}
