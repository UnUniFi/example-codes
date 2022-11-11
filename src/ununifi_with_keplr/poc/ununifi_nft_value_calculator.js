// update
function(instance, properties, context) {
    const address = properties.address;
    const classID = properties.class_id;
    const nftID = properties.nft_id;
    function changeQuinary(num) {
        return num % 2
    }
    function getLastNum(num) {
        return parseInt(num) % 10
    }
    function publishState(regularDenomAmount) {
        instance.publishState('nft_value', regularDenomAmount)
    }

    if (address && classID) {
        const lastChar = address.slice(-1);
        const lastCharCode = lastChar.charCodeAt(0)
        const userPointType = changeQuinary(getLastNum(lastCharCode))
        const classLastChar = classID.slice(-1);
        const classLastCharCode = classLastChar.charCodeAt(0)
        const classPointType = changeQuinary(getLastNum(classLastCharCode))
        if (userPointType == classPointType) {
            if (nftID) {
                const nftLastChar = nftID.slice(-1);
                const nftLastCharCode = nftLastChar.charCodeAt(0)
                const nftPointType = changeQuinary(getLastNum(nftLastCharCode))
                if (classPointType == nftPointType) {
                    publishState('1000GUU')
                } else { publishState('100GUU') }
            } else {
                publishState('100GUU')
            }
        } else { publishState('1GUU') }
    } else {
        publishState('1GUU')
    }

}