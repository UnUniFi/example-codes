import { cosmosclient, rest, proto } from '@cosmos-client/core';
import { ununifi } from 'ununifi-client';
import Long from 'long';
import { convertUnknownAccountToBaseAccount } from '../../../../utils/account/convertUnknownAccountToBaseAccount';
import { getAccountInfo } from '../../../../utils/account/getAccountInfo';
import { signThenBroadcastTx } from '../../../../utils/common';
import { setupCosmosClient } from '../../../../utils/config/setupSdk';

export const postTxNftMarketMsgListing = async (chainID: string, restURL: string, websocketURL: string, mnt: string) => {
  const sdk = setupCosmosClient(chainID, restURL, websocketURL);
  const account = await getAccountInfo(cosmosclient, sdk, mnt);

  // build MsgSend
  const msg = new ununifi.nftmarket.MsgListNft({
    sender: account.address.toString(),
    nft_id: {
      class_id: 'a10',
      nft_id: 'a10',
    },
    listing_type: ununifi.nftmarket.ListingType.DIRECT_ASSET_BORROW,
    bid_token: 'uguu',
    min_bid: '1',
    bid_active_rank: Long.fromString('2'),
  });

  const txBody = new proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msg)],
  });

  return await signThenBroadcastTx(cosmosclient, sdk, account, txBody);
};

export const examplePostTxNftMarketMsgListing = async () => {
  const chainID = 'ununifi-test-private-m1';
  const restURL = 'http://localhost:1317';
  const websocketURL = 'ws://localhost:26657';
  const mnt =
    'figure web rescue rice quantum sustain alert citizen woman cable wasp eyebrow monster teach hockey giant monitor hero oblige picnic ball never lamp distance';
  return await postTxNftMarketMsgListing(chainID, restURL, websocketURL, mnt);
};
