/**
 * @typedef {import("./../types").Context} Context
 * @typedef {import("./keplr").Instance} Instance
 * @typedef {import("./keplr").Data} Data
 * @typedef {import("./keplr").SignFields} SignFields
 */

/**
 * sign
 * 
 * @param {Instance} instance
 * @param {SignFields} properties
 * @param {Context} context
 */
function (instance, properties, context) {
  const { fromHexString, toHexString } = instance.data;
  const chainId = instance.data.chainId;
  const signer = instance.data.address;
  const authInfoBytes = fromHexString(properties.authInfoHex);
  const bodyBytes = fromHexString(properties.bodyHex);
  const accountNumber = Long.fromString(properties.accountNumString);

  const signResponse = context.async(async (cb) => {
    await keplr.enable(chainId);
    const signResponse = await keplr.signDirect(chainId, signer, {
      bodyBytes,
      authInfoBytes,
      chainId,
      accountNumber,
    });
    cb(null, signResponse);
  });

  instance.publishState("auth_info_hex", toHexString(signResponse.signed.authInfoBytes));
  instance.publishState("body_hex", toHexString(signResponse.signed.bodyBytes));
  instance.publishState("signature", signResponse.signature.signature);
}
