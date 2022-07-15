function(instance, properties, context) {
  const { toHexString, fetchAccount, currentAddressString, sdk, msgs } = instance.data;

  const txBody = createTxBody(msgs);
  const account = fetchAccount(sdk, currentAddressString);
  const authInfo = createAuthInfo(account);
  const txBuilder = new cosmosclient.TxBuilder(sdk, txBody, authInfo);
  const signDoc = txBuilder.signDoc(account.account_number);

  instance.data.txBuilder = txBuilder;

  instance.publishState('body_hex', toHexString(signDoc.body_bytes));
  instance.publishState('auth_info_hex', toHexString(signDoc.auth_info_bytes));
  instance.publishState('account_long_str', account.account_number.toString());

  //
  // subroutine
  //
  function createTxBody(msgs) {
    const txBody = new cosmosclient.proto.cosmos.tx.v1beta1.TxBody({
      messages: msgs.map((msg) => cosmosclient.codec.instanceToProtoAny(msg)),
    });
    return txBody;
  }

  function createAuthInfo(account) {
    return new cosmosclient.proto.cosmos.tx.v1beta1.AuthInfo({
      signer_infos: [
        {
          public_key: account.pub_key,
          mode_info: {
            single: {
              mode: cosmosclient.proto.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT,
            },
          },
          sequence: account.sequence,
        },
      ],
      fee: {
        gas_limit: Long.fromString('200000'),
      },
    });
  }
}
