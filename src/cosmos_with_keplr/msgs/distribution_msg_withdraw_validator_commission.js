function(instance, properties, context) {
    const { currentAddressString } = instance.data;

    const accAddress = cosmosclient.AccAddress.fromString(currentAddressString);
    const validatorAddress = accAddress.toValAddress().toString();

    const msg = new cosmosclient.proto.cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission({
      validator_address: validatorAddress,
    });

    instance.data.msgs = [msg];
    instance.triggerEvent('msg_withdraw_validator_commission_created');
}
