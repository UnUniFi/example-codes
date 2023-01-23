// init
function(instance, context) {
    instance.data.getNftBids = async (sdk, classId, nftId) => {
        const bids = await ununificlient.rest.nftmarket
            .nftBids(sdk, classId, nftId)
            .then((res) => res.data.bids);
        return bids
    }
}


// update
function(instance, properties, context) {
    const chainId = properties.chain_id;
    const websocket = properties.websocket;
    const rest = properties.rest;
    const classId = properties.class_id;
    const nftId = properties.nft_id;
    const sdk = createSdk(chainId, rest, websocket);
    console.log(sdk)

    const getBids = async () => {
        const bids = await instance.data.getNftBids(sdk.rest, classId, nftId);
        console.log(bids)
        const borrowAmounts = bids
            .map((bid) => Number(bid.deposit_amount.amount) - bid.borrowings.reduce((sum, borrow) => sum + Number(borrow.amount.amount), 0))
            .map((uguu) => (uguu / 1000000).toString());
        const borrowRates = bids
            .map((bid) => bid.deposit_lending_rate)
            .map((rate) => (Number(rate) * 100).toString());
        const borrowExpires = bids.map((bid) => bid.bidding_period);

        const repayAmounts = bids
            .map((bid) => bid.borrowings.reduce((sum, borrow) => sum + Number(borrow.amount.amount), 0))
            .map((uguu) => (uguu / 1000000).toString());

        // let repayAmounts = [];
        // let repayRates  = [];
        // let repayExpires  = [];
        // for (const bid of bids) {
        //     for (borrow of bid.borrowings) {
        //         repayAmounts.push((Number(borrow.amount.amount) / 1000000).toString())
        //         repayRates.push((Number(bid.deposit_lending_rate) * 100).toString())
        //         repayExpires.push(bid.bidding_period)
        //     }
        // }
        instance.publishState('borrow_amount', borrowAmounts.join());
        instance.publishState('borrow_rate', borrowRates.join());
        instance.publishState('borrow_expire', borrowExpires.join());
        instance.publishState('repay_amount', repayAmounts.join());
        instance.publishState('repay_rate', borrowRates.join());
        instance.publishState('repay_expire', borrowExpires.join());
    }
    getBids()

    function createSdk(chainId, rest, websocket) {
        const restApi = new cosmosclient.CosmosSDK(rest, chainId);
        const websocketApi = new cosmosclient.CosmosSDK(websocket, chainId);
        const sdk = { rest: restApi, websocket: websocketApi };
        return sdk;
    }
}