import { cosmosclient, rest } from "@cosmos-client/core";

export const getNodeInfo = async () => {
  const chainID = "ununifi-alpha-test-v2";
  const restURL = "http://ununifi-alpha-test-v2.cauchye.net:1317";
  const websocketURL = "ws://ununifi-alpha-test-v2.cauchye.net:26657";

  const restApi = new cosmosclient.CosmosSDK(restURL, chainID);
  const websocketApi = new cosmosclient.CosmosSDK(websocketURL, chainID);
  const sdk = {
    rest: restApi,
    websocket: websocketApi,
  };

  const response = await rest.tendermint.getNodeInfo(sdk.rest);
  console.log(response);

  const url = response.config.url;
  console.log(url);

  const status = response.status;
  console.log(status);

  const statusText = response.statusText;
  console.log(statusText);

  const nodeInfo = response.data;
  console.log(nodeInfo);

  return response;
};

(async () => {
  return await getNodeInfo();
})();
