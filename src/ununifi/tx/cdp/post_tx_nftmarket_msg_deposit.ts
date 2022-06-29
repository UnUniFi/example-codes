import { cosmosclient, rest, proto } from '@cosmos-client/core';
import { ununifi } from 'ununifi-client';
import Long from 'long';
import { getAccountInfo } from '../../../utils/account/getAccountInfo';
import { signThenBroadcastTx } from '../../../utils/common';
import { setupCosmosClient } from '../../../utils/config/setupSdk';

export const postTxCdpMsgDeposit = async (chainID: string, restURL: string,websocketURL: string, mnt: string) => {
  const sdk = setupCosmosClient(chainID,restURL, websocketURL)
  const account = await getAccountInfo(cosmosclient, sdk , mnt)

  // build MsgSend
  const collateral = {
    denom:"ubtc",
    amount: "10"
  }
  const collateralType = 'ubtc-a'
  const msg = new ununifi.cdp.MsgDeposit({
    depositor: account.address.toString(),
    owner: account.address.toString(),
    collateral,
    collateral_type: collateralType,
  });


  const txBody = new proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msg)],
  });

  return await signThenBroadcastTx(cosmosclient, sdk, account, txBody);
};


export const examplePostTxCdpMsgDeposit = async () => {
  const chainID = 'ununifi-test-private-m1';
  const restURL = 'http://localhost:1317';
  const websocketURL = 'ws://localhost:26657';
  const mnt = 'figure web rescue rice quantum sustain alert citizen woman cable wasp eyebrow monster teach hockey giant monitor hero oblige picnic ball never lamp distance';
  return await postTxCdpMsgDeposit(chainID, restURL, websocketURL, mnt)
}