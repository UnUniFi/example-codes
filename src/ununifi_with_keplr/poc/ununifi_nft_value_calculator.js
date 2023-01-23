function(instance, properties, context) {
    const address = properties.address
    const classID = properties.class_id
    const nftID = properties.nft_id
    function changeQuinary(num) {
        return num % 2
    }
    function getLastNum(num) {
        return parseInt(num) % 10
    }
    function publishState(regularDenomAmount) {
        instance.publishState('nft_value', regularDenomAmount)
    }

    if (address && classID && nftID) {
        // 初期NFTのリスト
        const primaryList =
            [
                {
                    "address": "ununifi1vchphhj9ykdt8sre4a2xwyzmmg4j2xd6zrgydd",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a00"
                },
                {
                    "address": "ununifi1ef8yfx6veguwxugf4uxtdagwa5cu0l0q4rcw0q",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a01"
                },
                {
                    "address": "ununifi1fqljy2g8hek4p3dp3d8csgc9gydnezh6fwfxsk",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a02"
                },
                {
                    "address": "ununifi15kqkszfvvytcwxmg6y5fhh72udkunkrlwd9q8z",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a03"
                },
                {
                    "address": "ununifi1pswksnfnw53guqwn0nwuj49rdyur4xlke36dxc",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a04"
                },
                {
                    "address": "ununifi1wjlgvtdxlnyxu5ns0g3jmts5y4c4jatza7r7jd",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a05"
                },
                {
                    "address": "ununifi1xej2k3mvvtyslvelwfczqelcpg2ca9w6jh8lu8",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a06"
                },
                {
                    "address": "ununifi15acyslq77wylle9kc3cueme5ml42aacsyz79z2",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a07"
                },
                {
                    "address": "ununifi1j4yqmqwhl9llc575pzd39lhprxnxmk99xeumf2",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a08"
                },
                {
                    "address": "ununifi1ksr9fqmugrnkwka5rj8y3yh4j09vnvs7unswe6",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a09"
                },
                {
                    "address": "ununifi1x57cl44ewx20k8jhmt06jjx28r20qny500xvza",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a010"
                },
                {
                    "address": "ununifi15k643s89n57tq34pr0qsfe2h3gcp5h4t4dyttj",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a011"
                },
                {
                    "address": "ununifi1leu5gpgxgywy8qak9x3jfa26k2vz2avytsusjr",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a012"
                },
                {
                    "address": "ununifi1n7d634pkv7wmjuvkugejyvay2xvv75devkvd7p",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a013"
                },
                {
                    "address": "ununifi1m6zk232w3ld3dmzpu7mncvj8vk4y8tjc8xq4wz",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a014"
                },
                {
                    "address": "ununifi1cyt8csv4j3p67mqwk0x0h9t2230lfsqv82rtl2",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a015"
                },
                {
                    "address": "ununifi14sp8gv9ta4jwdqflh4xq84ph7v8rpnlalc2ypw",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a016"
                },
                {
                    "address": "ununifi179xh34gna498hdtglq7mv2hwrxqwzw8tfg43ec",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a017"
                },
                {
                    "address": "ununifi1cr4r7xtwc4z2p7kkqm026r5zf99g2ygxtey7hy",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a018"
                },
                {
                    "address": "ununifi1yxt9vq4svlk8j9dysmlhdx3u8lc08h2wfynkxg",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a019"
                },
                {
                    "address": "ununifi12u9pxq2snxhft228u0xcs883l5sl0acjdwywqv",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a020"
                },
                {
                    "address": "ununifi17nj3wkalztnew0prt9k9j3yqg8mvwwm0gq89zn",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a021"
                },
                {
                    "address": "ununifi127x22rax30n5vuu8sp80xuulnu9u2juyh9c5yx",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a022"
                },
                {
                    "address": "ununifi1pthta2z9lehx8pn7g7rxgw9k3ff9x4ksjsfqxu",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a023"
                },
                {
                    "address": "ununifi1gjncyest6t47ncpxprc6mflazyvpau8pdmscvk",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a024"
                },
                {
                    "address": "ununifi1kqz0xy9y54jmytgphdk24pck9exwj0d25ahruw",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a00"
                },
                {
                    "address": "ununifi17xf63wfw0x2qhhq28nlug7m884gv4tclu490pf",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a01"
                },
                {
                    "address": "ununifi14458tclmj03wgyqwuu70kh4pzx42swqecrajx2",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a02"
                },
                {
                    "address": "ununifi140f0dlqwt997lwzhy9utsxa0pm2evzls9xu74u",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a03"
                },
                {
                    "address": "ununifi10svtjwd4f0zkytgqxt6te0qejueyn99nqp49dm",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a04"
                },
                {
                    "address": "ununifi19nqta7c36qrslyecknfqczc2ej27v0efapktjw",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a05"
                },
                {
                    "address": "ununifi18eve7mzw4a4evrqzr99xj53v6mqglss2hrvxx2",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a06"
                },
                {
                    "address": "ununifi18u50w0fk47c0qt4axrzqufs0nk3afer7vxdzm4",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a07"
                },
                {
                    "address": "ununifi1v857samym9xqwj2rsv09sfldszdp8ext2nt8zp",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a08"
                },
                {
                    "address": "ununifi154yel2ewfn2s7kkczqaxjf9fd38545ksy0x0qn",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a09"
                },
                {
                    "address": "ununifi1zlvjdkfwtulpcd7lrkllmylk2xygn2xadyspaa",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a010"
                },
                {
                    "address": "ununifi1rw2yac62qyng559u6s2u6s53de20ft4rj9dwpc",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a011"
                },
                {
                    "address": "ununifi1uc68tmfc40yurpw8xqk30sxggvd5javt9xvny5",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a012"
                },
                {
                    "address": "ununifi1msk54vd84kdd6yqd6g7qc24f7d9ddqznvqzzqk",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a013"
                },
                {
                    "address": "ununifi13rxg3m22wj3weell7zea7e4wjthgtxfp5wvrp5",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a014"
                },
                {
                    "address": "ununifi1vq4zzrn7w4rwhqyam7dax2dy009fr7h290wrc8",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a015"
                },
                {
                    "address": "ununifi19jjang7dql3wdse05d4hcm56708hz5zgy7234x",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a016"
                },
                {
                    "address": "ununifi1r3vnehhvexr2hv8eqn7622v4c0kpnvr53q7c3n",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a017"
                },
                {
                    "address": "ununifi1n334jvr2z7maq9v96zaelkcyyanv54dnlun574",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a018"
                },
                {
                    "address": "ununifi1x30rgf56a2m0ela482sp74eql9w4ulzhltmvfw",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a019"
                },
                {
                    "address": "ununifi1hqy7ge5ugrwq2kgr2z4dcr84zwj7qq2a98enyp",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a020"
                },
                {
                    "address": "ununifi197hlrc8lquene3hf2q9m9w0m66gzut2acapk6c",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a021"
                },
                {
                    "address": "ununifi14uc5s2yk43p47fzwjel4g8af3jjtwsdkkq0fgj",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a022"
                },
                {
                    "address": "ununifi1eq9star05sxl9heurjtcpdmhrcscdur9g85ttq",
                    "class_id": "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0",
                    "nft_id": "a023"
                },
                {
                    "address": "ununifi1vlsttrugcc5a54kp4frlew7azngufa05hedz87",
                    "class_id": "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28",
                    "nft_id": "a024"
                }
            ];

        const matchPrimary = primaryList.find((primary) => primary.address == address);

        if (matchPrimary && matchPrimary.class_id == classID && matchPrimary.nft_id == nftID) {
            console.log('primary NFT');
            publishState('1000GUU');
        }
    }

    if (address && classID) {
        const lastChar = address.slice(-1);
        const lastCharCode = lastChar.charCodeAt(0)
        console.log('lastCharCode : ' + lastCharCode)
        const userPointType = changeQuinary(getLastNum(lastCharCode))
        console.log('address binary: ' + userPointType)
        // Classのリストを作成
        const clssPointList = {
            "ununifi-4C356B50F7D9B8A735309E5F5F3F8748E1F8FF28": 0,
            "ununifi-55BE4AD4921F5258EE780346EF61739FDA1F88A0": 1
        }
        const classPointType = clssPointList[classID]
        console.log('class ID binary: ' + classPointType)
        if (userPointType == classPointType) {
            if (nftID) {
                const nftLastChar = nftID.slice(-1)
                const nftLastCharCode = nftLastChar.charCodeAt(0)
                const nftPointType = changeQuinary(getLastNum(nftLastCharCode))
                console.log('NFT ID binary: ' + nftPointType)
                if (classPointType == nftPointType) {
                    console.log('3 arg match')
                    publishState('1000GUU')
                } else {
                    console.log('address & class ID match')
                    publishState('100GUU')
                }
            } else {
                console.log('address & class ID match,  no NFT ID')
                publishState('100GUU')
            }
        } else {
            console.log('no arg match')
            publishState('1GUU')
        }
    } else {
        console.log('no address or class ID')
        publishState('1GUU')
    }
}