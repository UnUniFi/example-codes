import { postTxStakingMsgDelegate } from './post_tx_staking_msg_delegate';
import { postTxStakingMsgUndelegate } from './post_tx_staking_msg_undelegate';

describe('post_tx_bank_msg_undelegate', () => {
  it('should return successful tx response', async () => {
    expect.hasAssertions();

    // before undelegate, delegate is necessary
    const stakingMsgDelegateResponse = await postTxStakingMsgDelegate();
    console.log(stakingMsgDelegateResponse.data);
    expect(stakingMsgDelegateResponse.data.tx_response?.code).toBe(0);

    const txResponse = await postTxStakingMsgUndelegate();
    console.log(txResponse.data);
    expect(txResponse.status).toBe(200);
    expect(txResponse.statusText).toBe('OK');
    expect(txResponse.data.tx_response?.code).toBe(0);
  });
});
