import { postTxBankMsgSend } from "./post_tx_bank_msg_send";

describe("post_tx_bank_msg_send", () => {
  it("should return successful tx response", async () => {
    expect.hasAssertions();
    const txResponse = await postTxBankMsgSend();
    console.log(txResponse.data);
    expect(txResponse.status).toBe(200);
    expect(txResponse.statusText).toBe("OK");
    expect(txResponse.data.tx_response?.code).toBe(0);
  });
});
