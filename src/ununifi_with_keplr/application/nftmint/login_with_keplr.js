function(instance, properties, context) {

  const {loginWithKeplr } = instance.data;
  const chainId = instance.data.chainId;

  loginWithKeplr(chainId);
}