import { cosmosclient, rest, proto } from '@cosmos-client/core';
import Long from 'long';
import { convertUnknownAccountToBaseAccount } from '../../../utils/account/convertUnknownAccountToBaseAccount';

export const postTxStakingMsgUndelegate = async () => {
  // set bech32prefix to client
  const bech32Prefix = 'ununifi';
  const accAddr = bech32Prefix;
  const accPub = bech32Prefix + cosmosclient.AddressPrefix.Public;
  const valAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator;
  const valPub =
    bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Operator + cosmosclient.AddressPrefix.Public;
  const consAddr = bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus;
  const consPub =
    bech32Prefix + cosmosclient.AddressPrefix.Validator + cosmosclient.AddressPrefix.Consensus + cosmosclient.AddressPrefix.Public;
  const bech32PrefixConfig = {
    accAddr,
    accPub,
    valAddr,
    valPub,
    consAddr,
    consPub,
  };
  cosmosclient.config.setBech32Prefix(bech32PrefixConfig);

  // prepare sender's account info
  const senderMnemonic = 'month radio spell indicate eight treat expire ordinary buzz ten spray mad';

  const senderPrivateKeyUint8Array = await cosmosclient.generatePrivKeyFromMnemonic(senderMnemonic);
  const senderPrivateKey = new proto.cosmos.crypto.secp256k1.PrivKey({
    key: senderPrivateKeyUint8Array,
  });

  const senderPublicKey = senderPrivateKey.pubKey();

  const senderAccAddress = cosmosclient.AccAddress.fromPublicKey(senderPublicKey);
  const senderAccAddressString = senderAccAddress.toString();

  // set node info to client
  const chainID = 'ununifi-alpha-test-v2';
  const restURL = 'http://ununifi-alpha-test-v2.cauchye.net:1317';
  const websocketURL = 'ws://ununifi-alpha-test-v2.cauchye.net:26657';
  const restApi = new cosmosclient.CosmosSDK(restURL, chainID);
  const websocketApi = new cosmosclient.CosmosSDK(websocketURL, chainID);
  const sdk = {
    rest: restApi,
    websocket: websocketApi,
  };

  // call api to get baseAccount info to get account.sequence and account_number
  const accountResponse = await rest.auth.account(sdk.rest, senderAccAddress);
  const unknownAccount = cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(accountResponse.data?.account));
  const baseAccount = convertUnknownAccountToBaseAccount(unknownAccount);
  if (!baseAccount) {
    throw Error("Sender's account is invalid!");
  }
  const sequence = baseAccount.sequence;

  // build MsgUndelegate
  const validatorValAddressString = 'ununifivaloper1w4ujg5n5n3l3q054hahz22q3ls9zy38n23z28s';
  const amount: proto.cosmos.base.v1beta1.ICoin = {
    denom: 'uguu',
    amount: '1',
  };
  const msgUndelegate = new proto.cosmos.staking.v1beta1.MsgUndelegate({
    delegator_address: senderAccAddressString,
    validator_address: validatorValAddressString,
    amount: amount,
  });

  // build TxBody
  const memo = 'UnUniFi/example-codes';
  const txBody = new proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msgUndelegate)],
    memo,
  });

  // build AuthInfo
  const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
    signer_infos: [
      {
        public_key: cosmosclient.codec.instanceToProtoAny(senderPublicKey),
        mode_info: {
          single: {
            mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
          },
        },
        sequence,
      },
    ],
    fee: {
      gas_limit: Long.fromString('200000'),
    },
  });

  // prepare target bytes data to be signed
  const txBuilder = new cosmosclient.TxBuilder(sdk.rest, txBody, authInfo);
  const signDocBytes = txBuilder.signDocBytes(baseAccount.account_number);

  // sign and add signature to tx data
  const signature = senderPrivateKey.sign(signDocBytes);
  txBuilder.addSignature(signature);

  // broadcast signed tx
  const txResponse = await rest.tx.broadcastTx(sdk.rest, {
    tx_bytes: txBuilder.txBytes(),
    mode: rest.tx.BroadcastTxMode.Block,
  });

  return txResponse;
};
