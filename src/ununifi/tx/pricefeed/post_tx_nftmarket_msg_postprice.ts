import { cosmosclient, rest, proto } from '@cosmos-client/core';
import { ununifi } from 'ununifi-client';
import Long from 'long';
import { getAccountInfo } from '../../../utils/account/getAccountInfo';
import { signThenBroadcastTx } from '../../../utils/common';
import { setupCosmosClient } from '../../../utils/config/setupSdk';

export const postTxPricefeedMsgPostPrice = async (chainID: string, restURL: string,websocketURL: string, mnt: string, marketID: string) => {
  const sdk = setupCosmosClient(chainID,restURL, websocketURL)
  const account = await getAccountInfo(cosmosclient, sdk , mnt)

  // build MsgSend
  const newPrice = "2.984208922290198629"
  let expiryDate = new Date();
  const expiry = "14400"
  expiryDate = new Date(expiryDate.getTime() + Number.parseInt(expiry) * 1000);
  const msg = new ununifi.pricefeed.MsgPostPrice({
    from: account.address.toString(),
    market_id: marketID,
    price: newPrice,
    expiry: new proto.google.protobuf.Timestamp({
      seconds: Long.fromNumber(expiryDate.getTime() / 1000),
    }),
  });


  const txBody = new proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msg)],
  });

  return await signThenBroadcastTx(cosmosclient, sdk, account, txBody);
};


export const examplePostTxPricefeedMsgPostPrice = async () => {
  const chainID = 'ununifi-test-private-m1';
  const restURL = 'http://localhost:1317';
  const websocketURL = 'ws://localhost:26657';
  const mnt = 'figure web rescue rice quantum sustain alert citizen woman cable wasp eyebrow monster teach hockey giant monitor hero oblige picnic ball never lamp distance';
  const marketID = "ubtc:jpy"
  return await postTxPricefeedMsgPostPrice(chainID, restURL, websocketURL, mnt, marketID)
}


export const examplePostTxPricefeedMsgPostPrice2 = async () => {
  const chainID = 'ununifi-test-private-m1';
  const restURL = 'http://localhost:1317';
  const websocketURL = 'ws://localhost:26657';
  const mnt = 'figure web rescue rice quantum sustain alert citizen woman cable wasp eyebrow monster teach hockey giant monitor hero oblige picnic ball never lamp distance';
  const marketID = "ubtc:jpy:30"
  return await postTxPricefeedMsgPostPrice(chainID, restURL, websocketURL, mnt, marketID)
}