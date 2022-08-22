function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const name = properties.name;
  const baseTokenUri = properties.base_token_uri;
  const tokenSupplyCap = properties.token_supply_cap;
  const mintingPermission = properties.minting_permission;
  const symbol = properties.symbol;
  const description = properties.description;
  const classUri = properties.class_uri;

  const account = fetchAccount(sdk, currentAddressString);

  const msg = new ununificlient.proto.ununifi.nftmint.MsgCreateClass({
    sender: account.address,
    name: name,
    base_token_uri: baseTokenUri, 
    token_supply_cap: Long.fromString(tokenSupplyCap),
    minting_permission: mintingPermission,
    symbol: symbol,
    description: description,
    class_url: classUri,
  });

  instance.data.msgs.push(msg);
}
