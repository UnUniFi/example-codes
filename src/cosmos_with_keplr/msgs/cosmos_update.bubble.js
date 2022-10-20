function(instance, properties, context) {
  instance.data.bech32Prefix = properties.bech32_prefix;
  instance.data.publicKeyHexString = properties.public_key_hex;
  instance.data.currentAddressString = properties.address;
}
