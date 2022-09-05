function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const nftId = properties.nft_id;
  const classId = properties.class_id;
  const denom = properties.denom;
  const amount = properties.amount;
  const automaticPayment = properties.automatic_payment;

  const placeBid = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new ununificlient.proto.ununifi.nftmarket.MsgPlaceBid({
      sender: account.address,
      nft_id: {
        class_id: classId,
        nft_id: nftId,
      },
      amount: {
        denom: denom,
        amount: amount,
      },
      automatic_payment: automaticPayment,
    });
      
    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('bid_placed');
    console.log('txHash :' + txHash);
  };
  placeBid();
}

