# Example codes

Node.js sample codes to send transactions and refer information via Cosmos SDK blockchain or UnUniFi blockchain with [@cosmos-client/core](https://github.com/cosmos-client/cosmos-client-ts) and [ununifi-client](https://github.com/cosmos-client/ununifi-ts).

Refer to the following links for each npm packages and implementations.

| npm                                                                      | github                                                                              | description                                                    |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [@cosmos-client/core](https://www.npmjs.com/package/@cosmos-client/core) | [cosmos-client/cosmos-client-ts](https://github.com/cosmos-client/cosmos-client-ts) | JS/TS client library for Cosmos SDK blockchain common features |
| [ununifi-client](https://www.npmjs.com/package/ununifi-client)           | [cosmos-client/ununifi-ts](https://github.com/cosmos-client/ununifi-ts)             | JS/TS client library for UnUniFi blockchain specific features  |

## Try example codes on this repository

### Setup

- Install Node.js
- `npm install`

### Try query example

You can execute example codes of query like this.

```bash
npx jest src/cosmos/query/tendermint/get_node_info.spec.ts
```

You will get the following result.

<details>

```bash
  console.log
    {
      node_info: {
        protocol_version: { p2p: '8', block: '11', app: '0' },
        node_id: '8011abdd558a31c7241e4d2de11d01fcdf71373e',
        listen_addr: 'tcp://0.0.0.0:26656',
        network: 'ununifi-alpha-test-v2',
        version: '0.35.0-unreleased',
        channels: 'QCAhIiMwOGBhYmMA',
        moniker: 'ununifid_moniker9363',
        other: { tx_index: 'on', rpc_address: 'tcp://127.0.0.1:26657' }
      },
      application_version: {
        name: 'ununifi',
        app_name: 'ununifid',
        version: 'feature/listing_and_nft_mint2-0f33d7eec10dd4d52b08dd736ee16994a4ae9414',
        git_commit: '0f33d7eec10dd4d52b08dd736ee16994a4ae9414',
        build_tags: 'netgo,ledger',
        go_version: 'go version go1.17 linux/amd64',
        build_deps: [
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object], [Object], [Object],
          [Object], [Object], [Object], [Object],
          ... 16 more items
        ],
        cosmos_sdk_version: 'v0.46.0-beta2'
      }
    }

      at src/cosmos/query/tendermint/get_node_info.spec.ts:7:13

 PASS  src/cosmos/query/tendermint/get_node_info.spec.ts
  get_node_info
    ✓ should return expected response (67 ms)

------------------|---------|----------|---------|---------|-------------------
| File               | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ------------------ | --------- | ---------- | --------- | --------- | ------------------- |
| All files          | 100       | 100        | 100       | 100       |
| get_node_info.ts   | 100       | 100        | 100       | 100       |
| ------------------ | --------- | ---------- | --------- | --------- | ------------------- |
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.675 s
Ran all test suites matching /src\/cosmos\/query\/tendermint\/get_node_info.spec.ts/i.
```

</details>

### Try tx example

You can execute example codes of tx like this.

```bash
npx jest src/cosmos/tx/bank/post_tx_bank_msg_send.spec.ts
```

You will get the following result.

<details>

```bash
  console.log
    {
      tx_response: {
        height: '153360',
        txhash: '6FA0449801C9DCC83DF60E4D0D4A3BD99DAA7DDA7A6730420E7BCDCE27E9F1AD',
        codespace: '',
        code: 0,
        data: '12260A242F636F736D6F732E62616E6B2E763162657461312E4D736753656E64526573706F6E7365',
        raw_log: '[{"msg_index":0,"events":[{"type":"coin_received","attributes":[{"key":"receiver","value":"ununifi18y5nnx3r9s4w398sn0nqcykh2y7sx8ljd423t6"},{"key":"amount","value":"1uguu"}]},{"type":"coin_spent","attributes":[{"key":"spender","value":"ununifi18ytx2jmfp00unst6hn3hlg6vfz0praqc88q003"},{"key":"amount","value":"1uguu"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmos.bank.v1beta1.MsgSend"},{"key":"sender","value":"ununifi18ytx2jmfp00unst6hn3hlg6vfz0praqc88q003"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"ununifi18y5nnx3r9s4w398sn0nqcykh2y7sx8ljd423t6"},{"key":"sender","value":"ununifi18ytx2jmfp00unst6hn3hlg6vfz0praqc88q003"},{"key":"amount","value":"1uguu"}]}]}]',
        logs: [ [Object] ],
        info: '',
        gas_wanted: '0',
        gas_used: '0',
        tx: null,
        timestamp: '',
        events: [
          [Object], [Object],
          [Object], [Object],
          [Object], [Object],
          [Object], [Object],
          [Object]
        ]
      }
    }

      at src/cosmos/tx/bank/post_tx_bank_msg_send.spec.ts:7:13

 PASS  src/cosmos/tx/bank/post_tx_bank_msg_send.spec.ts (6.03 s)
  post_tx_bank_msg_send
    ✓ should return successful tx response (3486 ms)

----------------------------------------|---------|----------|---------|---------|-------------------
| File                                     | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ---------------------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                                | 67.98     | 37.5       | 100       | 67.98     |
| cosmos/tx/bank                           | 98.44     | 50         | 100       | 98.44     |
| post_tx_bank_msg_send.ts                 | 98.44     | 50         | 100       | 98.44     | 72-73               |
| utils/account                            | 14.86     | 25         | 100       | 14.86     |
| convertUnknownAccountToBaseAccount.ts    | 14.86     | 25         | 100       | 14.86     | 7,9,13-73           |
| ---------------------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        6.118 s, estimated 7 s
Ran all test suites matching /src\/cosmos\/tx\/bank\/post_tx_bank_msg_send.spec.ts/i.
```

</details>
