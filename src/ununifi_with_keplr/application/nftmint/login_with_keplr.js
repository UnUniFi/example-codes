function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const name = properties.name;
  const baseTokenUri = properties.base_token_uri;
  const tokenSupplyCap = properties.token_supply_cap;
  const mintingPermission = properties.minting_permission;
  const symbol = properties.symbol;
  const description = properties.description;
  const classUrl = properties.class_url;

  const createClass = async () => {
    try {
      await loginWithKeplr(chainId);
      const account = await fetchAccount(sdk, currentAddressString);
      const msg = new ununificlient.proto.ununifi.nftmint.MsgCreateClass({
        sender: account.address,
        name: name,
        base_token_uri: baseTokenUri,
        token_supply_cap: Long.fromString(tokenSupplyCap),
        minting_permission: mintingPermission,
        symbol: symbol,
        description: description,
        class_url: classUrl,
      });

      const txBuilder = createTx(sdk, [msg], account);
      const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
      const txHash = await broadcastTx(sdk, signedTxBuilder);
      instance.publishState('tx_hash', txHash);
      instance.triggerEvent('class_created');
      console.log('txHash : ' + txHash);
    } catch (error) {
      instance.publishState('error', error);
      instance.triggerEvent('error');
      
    }
  };
  createClass();
}
