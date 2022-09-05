function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
  const chainId = instance.data.chainId;

  const nftId = properties.nft_id;
  const classId = properties.class_id;
  const bidToken = properties.bid_token;
  const minBid = properties.min_bid;
  const bidActiveRank = properties.bid_active_rank;
  const listingType = properties.listing_type;

  const listNft = async () => {
    await loginWithKeplr(chainId);
    const account = await fetchAccount(sdk, currentAddressString);
    const msg = new ununificlient.proto.ununifi.nftmarket.MsgListNft({
      sender: account.address,
      nft_id: {
        class_id: classId,
        nft_id: nftId,
      },
      listing_type: listingType,
      bid_token: bidToken,
      min_bid: minBid,
      bid_active_rank: Long.fromString(bidActiveRank),
    });

    const txBuilder = createTx(sdk, [msg], account);
    const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
    const txHash = await broadcastTx(sdk, signedTxBuilder);
    instance.publishState('tx_hash', txHash);
    instance.triggerEvent('nft_listed');
    console.log('txHash :' + txHash);
  };
  listNft();
}
