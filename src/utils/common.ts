import { proto, rest } from '@cosmos-client/core';
import Long from 'long';
export const signTx = (cosmosclient:any, sdk:any ,account:any, txBody:any) => {
  // build AuthInfo
  const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
    signer_infos: [
      {
        public_key: cosmosclient.codec.instanceToProtoAny(account.pubKey),
        mode_info: {
          single: {
            mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
          },
        },
        sequence:account.account?.sequence,
      },
    ],
    fee: {
      gas_limit: Long.fromString('300000'),
    },
  });

  // prepare target bytes data to be signed
  const txBuilder = new cosmosclient.TxBuilder(sdk.rest, txBody, authInfo);
  const signDocBytes = txBuilder.signDocBytes(account.account?.account_number);

  // sign and add signature to tx data
  const signature = account.privKey.sign(signDocBytes);
  txBuilder.addSignature(signature);
  return txBuilder
}

export const broadcastTx = async (sdk: any, txBuilder: any) => {
  const txResponse = await rest.tx.broadcastTx(sdk.rest, {
    tx_bytes: txBuilder.txBytes(),
    mode: rest.tx.BroadcastTxMode.Block,
  });

  return txResponse;
}

export const signThenBroadcastTx = async (cosmosclient:any, sdk:any ,account:any, txBody:any) => {
  const txBuilder = signTx(cosmosclient, sdk, account, txBody)
  return await broadcastTx(sdk, txBuilder)
}
