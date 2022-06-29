import { postTxBankMsgSend } from './src/cosmos/tx/bank/post_tx_bank_msg_send';
import { examplePostTxNftMarketMsgListing } from './src/ununifi/tx/nftmarket/post_tx_nftmarket_msg_listing';
import { examplePostTxNftMarketMsgPlaceBid } from './src/ununifi/tx/nftmarket/post_tx_nftmarket_msg_placebid';
import { examplePostTxPricefeedMsgPostPrice,examplePostTxPricefeedMsgPostPrice2 } from './src/ununifi/tx/pricefeed/post_tx_nftmarket_msg_postprice';
import { examplePostTxCdpMsgCreateCdp } from './src/ununifi/tx/cdp/post_tx_nftmarket_msg_create_cdp';
import { examplePostTxCdpMsgDeposit } from './src/ununifi/tx/cdp/post_tx_nftmarket_msg_deposit';
import { getCdpInfo } from './src/ununifi/query/cdp/get_cdp';

async function main() {
  // for nftmarket
  // const listingResult = await examplePostTxNftMarketMsgListing()
  // showResult(listingResult)
  // const bidResult = await examplePostTxNftMarketMsgPlaceBid()
  // showResult(bidResult)

  // for cdp
  const postpriceResult = await examplePostTxPricefeedMsgPostPrice()
  showResult(postpriceResult)

  const postpriceResult2 = await examplePostTxPricefeedMsgPostPrice2()
  showResult(postpriceResult2)

  const createCdpResult = await examplePostTxCdpMsgCreateCdp()
  showResult(createCdpResult)

  const getNodeInfoResult = await getCdpInfo()
  showResult(getNodeInfoResult)

  const depositResult = await examplePostTxCdpMsgDeposit()
  showResult(depositResult)
}
function showResult(result:any){
  console.log(result.data)
  console.log(result.data.tx_response?.raw_log)
  if(typeof result.data.tx_response?.raw_log === "string"){
    console.log(
      JSON.stringify(JSON.parse(result.data.tx_response?.raw_log),null, 2)
    );
  }
}

main()