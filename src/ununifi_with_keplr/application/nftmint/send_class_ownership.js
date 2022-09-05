function a(instance, properties, context) {
    const { sdk, currentAddressString, fetchAccount, createTx, loginWithKeplr, signWithKeplr, broadcastTx } = instance.data;
    const chainId = instance.data.chainId;

    const classId = properties.class_id;
    const recipient = properties.recipient;

    const sendClassOwnership = async () => {
        await loginWithKeplr(chainId);
        const account = await fetchAccount(sdk, currentAddressString);
        const msg = new ununificlient.proto.ununifi.nftmint.MsgSendClassOwnership({
            sender: account.address,
            class_id: classId,
            recipient: recipient,
        });

        const txBuilder = createTx(sdk, [msg], account);
        const signedTxBuilder = await signWithKeplr(chainId, account, txBuilder);
        const txHash = await broadcastTx(sdk, signedTxBuilder);
        instance.publishState('tx_hash', txHash);
        instance.triggerEvent('class_ownership_sent');
        console.log('txHash :' + txHash);
    };
    sendClassOwnership();
}