function(instance, properties, context) {
  const { sdk, currentAddressString, fetchAccount } = instance.data;

  const nftId = properties.nft_id;
  const classId = properties.class_id;
  const bidToken = properties.bid_token;
  const minBid = properties.min_bid;
  const bidActiveRank = properties.bid_active_rank;
  const listingType = properties.listing_type;

  const account = fetchAccount(sdk, currentAddressString);

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

  instance.data.msgs.push(msg);
}
