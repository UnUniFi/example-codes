function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const mintStableCoin = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new ununificlient.proto.ununifi.nftmarket.MsgMintStableCoin({
      sender: account.address,
    });
    
    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('stable_coin_minted');
    console.log('txHash : ' + txHash);
  };
  mintStableCoin();
}
