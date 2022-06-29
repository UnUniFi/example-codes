import { cosmosclient,  proto } from '@cosmos-client/core';
import { ununifi,rest } from 'ununifi-client';
import { setupCosmosClient } from '../../../utils/config/setupSdk';
export const getAllCdpsInfo = async () => {

  const chainID = 'ununifi-test-private-m1';
  const restURL = 'http://localhost:1317';
  const websocketURL = 'ws://localhost:26657';

  const sdk = setupCosmosClient(chainID,restURL, websocketURL)

  return await rest.ununifi.cdp.allCdps(sdk.rest)
};
