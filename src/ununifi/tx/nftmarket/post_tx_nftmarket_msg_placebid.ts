import { cosmosclient, rest, proto } from '@cosmos-client/core';
import { ununifi } from 'ununifi-client';
import Long from 'long';
import { getAccountInfo } from '../../../utils/account/getAccountInfo';
import { signThenBroadcastTx } from '../../../utils/common';
import { setupCosmosClient } from '../../../utils/config/setupSdk';

export const postTxNftMarketMsgPlaceBid = async (chainID: string, restURL: string,websocketURL: string, mnt: string) => {
  const sdk = setupCosmosClient(chainID,restURL, websocketURL)
  const account = await getAccountInfo(cosmosclient, sdk , mnt)

  // build MsgSend
  const msg = new ununifi.nftmarket.MsgPlaceBid({
    sender: account.address.toString(),
    nft_id:{
          class_id: "a10",
          nft_id: "a10",
    },
    amount: {
      amount:"100",
      denom:"uguu"
    },
    automatic_payment: true,
  });

  const txBody = new proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msg)],
  });

  return await signThenBroadcastTx(cosmosclient, sdk, account, txBody);
};


export const examplePostTxNftMarketMsgPlaceBid = async () => {
  const chainID = 'ununifi-test-private-m1';
  const restURL = 'http://localhost:1317';
  const websocketURL = 'ws://localhost:26657';
  const mnt = 'chimney diesel tone pipe mouse detect vibrant video first jewel vacuum winter grant almost trim crystal similar giraffe dizzy hybrid trigger muffin awake leader'
  return await postTxNftMarketMsgPlaceBid(chainID, restURL, websocketURL, mnt)
}