import { postTxStakingMsgDelegate } from './post_tx_staking_msg_delegate';
import { postTxStakingMsgUndelegate } from './post_tx_staking_msg_undelegate';

describe('post_tx_bank_msg_send', () => {
  it('should return successful tx response', async () => {
    expect.hasAssertions();

    const txResponse = await postTxStakingMsgDelegate();
    console.log(txResponse.data);
    expect(txResponse.status).toBe(200);
    expect(txResponse.statusText).toBe('OK');
    expect(txResponse.data.tx_response?.code).toBe(0);

    // after delegate, undelegate is necessary to reset
    const msgUndelegateResponse = await postTxStakingMsgUndelegate();
    console.log(msgUndelegateResponse.data);
    expect(msgUndelegateResponse.data.tx_response?.code).toBe(0);
  });
});
