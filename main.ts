import { postTxBankMsgSend } from './src/cosmos/tx/bank/post_tx_bank_msg_send';
import { examplePostTxNftMarketMsgListing } from './src/ununifi/tx/nftmarket/post_tx_nftmarket_msg_listing';

async function main() {
  const result = await examplePostTxNftMarketMsgListing()
  // const result = await postTxBankMsgSend()
  console.log(result.data)
  console.log(result.data.tx_response?.raw_log)
  if(typeof result.data.tx_response?.raw_log === "string"){
    console.log(
      JSON.stringify(JSON.parse(result.data.tx_response?.raw_log),null, 2)
    );
  }
}

main()