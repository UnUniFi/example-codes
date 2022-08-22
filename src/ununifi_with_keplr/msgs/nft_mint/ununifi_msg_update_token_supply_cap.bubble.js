function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const classId = properties.class_id;
  const tokenSupplyCap = properties.token_supply_cap;


  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmint.MsgUpdateTokenSupplyCap({
    sender: account.address,
    class_id: classId,
    token_supply_cap:Long.fromString(tokenSupplyCap) 
  });

  instance.data.msgs.push(msg);
}
