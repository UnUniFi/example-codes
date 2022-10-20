function(instance, context) {
    instance.data.msgs = [];
    instance.data.toHexString = (bytes) => {
        return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    };

    instance.data.fromHexString = (hexString) => {
        return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    };

    instance.data.fetchAccount = async (sdk, addressString) => {
        const address = cosmosclient.AccAddress.fromString(addressString);
        const account = await cosmosclient.rest.auth
            .account(sdk.rest, address)
            .then((res) => cosmosclient.codec.protoJSONToInstance(cosmosclient.codec.castProtoJSONOfProtoAny(res.data.account)))
            .catch((error) => {
                console.log(error);
                instance.publishState("error", error);
                instance.triggerEvent("error");
            })
        if (!(account instanceof cosmosclient.proto.cosmos.auth.v1beta1.BaseAccount)) {
            throw new Error('it is not BaseAccount instance');
        }

        return account;
    };
}
