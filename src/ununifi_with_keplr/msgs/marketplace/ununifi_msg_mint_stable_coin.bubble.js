function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmarket.MsgMintStableCoin({
    sender: account.address,
  });

  instance.data.msgs.push(msg);
}
