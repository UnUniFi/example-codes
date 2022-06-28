import { proto, rest } from '@cosmos-client/core';
import { convertUnknownAccountToBaseAccount } from './convertUnknownAccountToBaseAccount';

export const getAccountInfo = async (cosmosclient: any, sdk: any,mnt: string) => {
  const genPrivKey = await cosmosclient.generatePrivKeyFromMnemonic(mnt);
  const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
    key: genPrivKey,
  });
  const pubKey = privKey.pubKey();
  const address = cosmosclient.AccAddress.fromPublicKey(pubKey);

  const accountResponse = await rest.auth.account(sdk.rest, address);
  const unknownAccount = cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(accountResponse.data?.account));
  const account = convertUnknownAccountToBaseAccount(unknownAccount);
  // const account = await rest.auth
  //     .account(sdk.rest, fromAddress)
  //     .then((res) => cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(res.data.account)))
  //   .catch((error) => {
  //     return null
  //   });

  // if (!(account instanceof proto.cosmos.auth.v1beta1.BaseAccount)) {
  //   console.log(account);
  //   return;
  // }
  return {
    account:account,
    address,
    pubKey,
    privKey
  }
}
