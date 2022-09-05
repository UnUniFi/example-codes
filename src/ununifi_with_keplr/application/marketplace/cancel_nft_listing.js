function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const nftId = properties.nft_id;
  const classId = properties.class_id;

  const cancelNftListing = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new ununificlient.proto.ununifi.nftmarket.MsgCancelNftListing({
      sender: account.address,
      nft_id: {
        class_id: classId,
        nft_id: nftId,
      },
    });
  
    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('nft_listing_canceled');
    console.log('txHash :' + txHash);
  };
  cancelNftListing();
}

