import { getNodeInfo } from "./get_node_info";

describe("get_node_info", () => {
  it("should return expected response", async () => {
    expect.hasAssertions();
    const response = await getNodeInfo();
    console.log(response.data);
    expect(response.config.url).toBe(
      "http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/base/tendermint/v1beta1/node_info"
    );
    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    // Note: Currently, version mismatch between @cosmos-client/core and ununifi-alpha-test-v2.
    expect((response.data as any).node_info.network).toBe(
      "ununifi-alpha-test-v2"
    );
  });
});
