function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const classId = properties.class_id;
  const nftId = properties.nft_id;
  const recipient = properties.recipient;

  const mintNft = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new ununificlient.proto.ununifi.nftmint.MsgMintNFT({
      sender: account.address,
      class_id: classId,
      nft_id: nftId,
      recipient: recipient,
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('nft_minted');
    console.log('txHash :' + txHash);
  };
  mintNft();
}
