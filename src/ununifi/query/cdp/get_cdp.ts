import { cosmosclient,  proto } from '@cosmos-client/core';
import { ununifi,rest } from 'ununifi-client';
import { setupCosmosClient } from '../../../utils/config/setupSdk';
export const getCdpInfo = async () => {

  const chainID = 'ununifi-test-private-m1';
  const restURL = 'http://localhost:1317';
  const websocketURL = 'ws://localhost:26657';

  const sdk = setupCosmosClient(chainID,restURL, websocketURL)

  const address = "ununifi1a8jcsmla6heu99ldtazc27dna4qcd4jygsthx6"
  const collateralType = "ubtc-a"
  return await rest.ununifi.cdp.cdp(
    sdk.rest, cosmosclient.AccAddress.fromString(address), collateralType
  )
};
