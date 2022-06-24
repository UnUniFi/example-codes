import { cosmosclient, rest, proto } from "@cosmos-client/core";
import Long from "long";
import { convertUnknownAccountToBaseAccount } from "../../../utils/convertUnknownAccountToBaseAccount";

export const postTxBankMsgSend = async () => {
  // set bech32prefix to client
  const bech32Prefix = "ununifi";
  const accAddr = bech32Prefix;
  const accPub = bech32Prefix + cosmosclient.AddressPrefix.Public;
  const valAddr =
    bech32Prefix +
    cosmosclient.AddressPrefix.Validator +
    cosmosclient.AddressPrefix.Operator;
  const valPub =
    bech32Prefix +
    cosmosclient.AddressPrefix.Validator +
    cosmosclient.AddressPrefix.Operator +
    cosmosclient.AddressPrefix.Public;
  const consAddr =
    bech32Prefix +
    cosmosclient.AddressPrefix.Validator +
    cosmosclient.AddressPrefix.Consensus;
  const consPub =
    bech32Prefix +
    cosmosclient.AddressPrefix.Validator +
    cosmosclient.AddressPrefix.Consensus +
    cosmosclient.AddressPrefix.Public;
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
  const mnemonic =
    "month radio spell indicate eight treat expire ordinary buzz ten spray mad";
  console.log(mnemonic);

  const privateKeyUint8Array = await cosmosclient.generatePrivKeyFromMnemonic(
    mnemonic
  );
  const privateKey = new proto.cosmos.crypto.secp256k1.PrivKey({
    key: privateKeyUint8Array,
  });
  const privateKeyString = Buffer.from(privateKeyUint8Array).toString("hex");
  console.log(privateKeyString);

  const publicKey = privateKey.pubKey();
  const publicKeyUint8Array = publicKey.bytes();
  const publicKeyString = Buffer.from(publicKeyUint8Array).toString("hex");
  console.log(publicKeyString);

  const accAddress = cosmosclient.AccAddress.fromPublicKey(publicKey);
  const accAddressString = accAddress.toString();
  console.log(accAddressString);

  // set node info to client
  const chainID = "ununifi-alpha-test-v2";
  const restURL = "http://ununifi-alpha-test-v2.cauchye.net:1317";
  const websocketURL = "ws://ununifi-alpha-test-v2.cauchye.net:26657";
  const restApi = new cosmosclient.CosmosSDK(restURL, chainID);
  const websocketApi = new cosmosclient.CosmosSDK(websocketURL, chainID);
  const sdk = {
    rest: restApi,
    websocket: websocketApi,
  };

  // call api to get baseAccount info to get account.sequence and account_number
  const accountResponse = await rest.auth.account(sdk.rest, accAddress);
  const unknownAccount = cosmosclient.codec.protoJSONToInstance(
    cosmosclient.codec.castProtoJSONOfProtoAny(accountResponse.data?.account)
  );
  const baseAccount = convertUnknownAccountToBaseAccount(unknownAccount);
  if (!baseAccount) {
    throw Error("Sender's account is invalid!");
  }
  const sequence = baseAccount.sequence;

  // build MsgSend
  const recipientAccAddressString =
    "ununifi18y5nnx3r9s4w398sn0nqcykh2y7sx8ljd423t6";
  const amount: proto.cosmos.base.v1beta1.ICoin[] = [
    {
      denom: "uguu",
      amount: "1",
    },
  ];
  const msgSend = new proto.cosmos.bank.v1beta1.MsgSend({
    from_address: accAddressString,
    to_address: recipientAccAddressString,
    amount,
  });

  // build TxBody
  const txBody = new proto.cosmos.tx.v1beta1.TxBody({
    messages: [cosmosclient.codec.instanceToProtoAny(msgSend)],
  });

  // build AuthInfo
  const authInfo = new proto.cosmos.tx.v1beta1.AuthInfo({
    signer_infos: [
      {
        public_key: cosmosclient.codec.instanceToProtoAny(publicKey),
        mode_info: {
          single: {
            mode: proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
          },
        },
        sequence: sequence,
      },
    ],
    fee: {
      gas_limit: Long.fromString("200000"),
    },
  });

  // prepare target bytes data to be signed
  const txBuilder = new cosmosclient.TxBuilder(sdk.rest, txBody, authInfo);
  const signDocBytes = txBuilder.signDocBytes(baseAccount.account_number);

  // sign and add signature to tx data
  const signature = privateKey.sign(signDocBytes);
  txBuilder.addSignature(signature);

  // broadcast signed tx
  const txResponse = await rest.tx.broadcastTx(sdk.rest, {
    tx_bytes: txBuilder.txBytes(),
    mode: rest.tx.BroadcastTxMode.Block,
  });

  console.log(txResponse);
  return txResponse;
};

(async () => {
  return await postTxBankMsgSend();
})();
