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
npx ts-node cosmos/query/tendermint/get_node_info.ts
```

You will get the following result.

<details>

```bash
{
  status: 200,
  statusText: 'OK',
  headers: {
    'content-type': 'application/json',
    'grpc-metadata-content-type': 'application/grpc+cosmos-sdk-grpc-codec',
    'grpc-metadata-x-cosmos-block-height': '139026',
    'x-server-time': '1655983047',
    date: 'Thu, 23 Jun 2022 11:17:27 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked'
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: [Function: httpAdapter],
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: [Function: validateStatus],
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'axios/0.23.0'
    },
    method: 'get',
    url: 'http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/base/tendermint/v1beta1/node_info',
    data: undefined
  },
  request: <ref *1> ClientRequest {
    _events: [Object: null prototype] {
      abort: [Function (anonymous)],
      aborted: [Function (anonymous)],
      connect: [Function (anonymous)],
      error: [Function (anonymous)],
      socket: [Function (anonymous)],
      timeout: [Function (anonymous)],
      prefinish: [Function: requestOnPrefinish]
    },
    _eventsCount: 7,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: false,
    _last: true,
    chunkedEncoding: false,
    shouldKeepAlive: false,
    maxRequestsOnConnectionReached: false,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: false,
    sendDate: false,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: 0,
    _hasBody: true,
    _trailer: '',
    finished: true,
    _headerSent: true,
    _closed: false,
    socket: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'ununifi-alpha-test-v2.cauchye.net',
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: null,
      _server: null,
      parser: null,
      _httpMessage: [Circular *1],
      [Symbol(async_id_symbol)]: 4,
      [Symbol(kHandle)]: [TCP],
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kSetNoDelay)]: false,
      [Symbol(kSetKeepAlive)]: false,
      [Symbol(kSetKeepAliveInitialDelay)]: 0,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _header: 'GET /cosmos/base/tendermint/v1beta1/node_info HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'User-Agent: axios/0.23.0\r\n' +
      'Host: ununifi-alpha-test-v2.cauchye.net:1317\r\n' +
      'Connection: close\r\n' +
      '\r\n',
    _keepAliveTimeout: 0,
    _onPendingData: [Function: nop],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      defaultPort: 80,
      protocol: 'http:',
      options: [Object: null prototype],
      requests: [Object: null prototype] {},
      sockets: [Object: null prototype],
      freeSockets: [Object: null prototype] {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      scheduling: 'lifo',
      maxTotalSockets: Infinity,
      totalSocketCount: 1,
      [Symbol(kCapture)]: false
    },
    socketPath: undefined,
    method: 'GET',
    maxHeaderSize: undefined,
    insecureHTTPParser: undefined,
    path: '/cosmos/base/tendermint/v1beta1/node_info',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      socket: [Socket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      rawHeaders: [Array],
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 200,
      statusMessage: 'OK',
      client: [Socket],
      _consuming: true,
      _dumped: false,
      req: [Circular *1],
      responseUrl: 'http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/base/tendermint/v1beta1/node_info',
      redirects: [],
      [Symbol(kCapture)]: false,
      [Symbol(kHeaders)]: [Object],
      [Symbol(kHeadersCount)]: 14,
      [Symbol(kTrailers)]: null,
      [Symbol(kTrailersCount)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    reusedSocket: false,
    host: 'ununifi-alpha-test-v2.cauchye.net',
    protocol: 'http:',
    _redirectable: Writable {
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _options: [Object],
      _ended: true,
      _ending: true,
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 0,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function (anonymous)],
      _currentRequest: [Circular *1],
      _currentUrl: 'http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/base/tendermint/v1beta1/node_info',
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'user-agent': [Array],
      host: [Array]
    }
  },
  data: {
    node_info: {
      protocol_version: [Object],
      node_id: '8011abdd558a31c7241e4d2de11d01fcdf71373e',
      listen_addr: 'tcp://0.0.0.0:26656',
      network: 'ununifi-alpha-test-v2',
      version: '0.35.0-unreleased',
      channels: 'QCAhIiMwOGBhYmMA',
      moniker: 'ununifid_moniker9363',
      other: [Object]
    },
    application_version: {
      name: 'ununifi',
      app_name: 'ununifid',
      version: 'feature/listing_and_nft_mint2-0f33d7eec10dd4d52b08dd736ee16994a4ae9414',
      git_commit: '0f33d7eec10dd4d52b08dd736ee16994a4ae9414',
      build_tags: 'netgo,ledger',
      go_version: 'go version go1.17 linux/amd64',
      build_deps: [Array],
      cosmos_sdk_version: 'v0.46.0-beta2'
    }
  }
}

http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/base/tendermint/v1beta1/node_info

200

OK

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
```

</details>

### Try tx example

You can execute example codes of tx like this.

```bash
npx ts-node cosmos/tx/bank/post_tx_bank_msg_send.ts
```

You will get the following result.

<details>

```bash
month radio spell indicate eight treat expire ordinary buzz ten spray mad
f24f9d281b6792c5c678579e73ff691c29ab12384805be90e858ffc311fb081b
020ff7a5e4f015563d1fbfdf78b7dce2ea6d66a8f618af70e562df0d5b89070a1c
ununifi18ytx2jmfp00unst6hn3hlg6vfz0praqc88q003
{
  status: 200,
  statusText: 'OK',
  headers: {
    'content-type': 'application/json',
    'x-server-time': '1655988380',
    date: 'Thu, 23 Jun 2022 12:46:22 GMT',
    connection: 'close',
    'transfer-encoding': 'chunked'
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: [Function: httpAdapter],
    transformRequest: [ [Function: transformRequest] ],
    transformResponse: [ [Function: transformResponse] ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: [Function: validateStatus],
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'User-Agent': 'axios/0.23.0',
      'Content-Length': 449
    },
    method: 'post',
    data: '{"tx_bytes":"Co4BCosBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmsKLnVudW5pZmkxOHl0eDJqbWZwMDB1bnN0NmhuM2hsZzZ2ZnowcHJhcWM4OHEwMDMSLnVudW5pZmkxOHk1bm54M3I5czR3Mzk4c24wbnFjeWtoMnk3c3g4bGpkNDIzdDYaCQoEdWd1dRIBMRJYClAKRgofL2Nvc21vcy5jcnlwdG8uc2VjcDI1NmsxLlB1YktleRIjCiECD/el5PAVVj0fv994t9zi6m1mqPYYr3DlYt8NW4kHChwSBAoCCAEYABIEEMCaDBpAlRCO7S4IR8exOTrL0ov52Ub0+XE6T3+qlobJLmuW170irfTop+4D1FYQUewEaHJbF0+AIRPSOjYfi6CYI2OO6w==","mode":"BROADCAST_MODE_BLOCK"}',
    url: 'http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/tx/v1beta1/txs'
  },
  request: <ref *1> ClientRequest {
    _events: [Object: null prototype] {
      abort: [Function (anonymous)],
      aborted: [Function (anonymous)],
      connect: [Function (anonymous)],
      error: [Function (anonymous)],
      socket: [Function (anonymous)],
      timeout: [Function (anonymous)],
      prefinish: [Function: requestOnPrefinish]
    },
    _eventsCount: 7,
    _maxListeners: undefined,
    outputData: [],
    outputSize: 0,
    writable: true,
    destroyed: false,
    _last: true,
    chunkedEncoding: false,
    shouldKeepAlive: false,
    maxRequestsOnConnectionReached: false,
    _defaultKeepAlive: true,
    useChunkedEncodingByDefault: true,
    sendDate: false,
    _removedConnection: false,
    _removedContLen: false,
    _removedTE: false,
    _contentLength: null,
    _hasBody: true,
    _trailer: '',
    finished: true,
    _headerSent: true,
    _closed: false,
    socket: Socket {
      connecting: false,
      _hadError: false,
      _parent: null,
      _host: 'ununifi-alpha-test-v2.cauchye.net',
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      _writableState: [WritableState],
      allowHalfOpen: false,
      _sockname: null,
      _pendingData: null,
      _pendingEncoding: '',
      server: null,
      _server: null,
      parser: null,
      _httpMessage: [Circular *1],
      [Symbol(async_id_symbol)]: 23,
      [Symbol(kHandle)]: [TCP],
      [Symbol(lastWriteQueueSize)]: 0,
      [Symbol(timeout)]: null,
      [Symbol(kBuffer)]: null,
      [Symbol(kBufferCb)]: null,
      [Symbol(kBufferGen)]: null,
      [Symbol(kCapture)]: false,
      [Symbol(kSetNoDelay)]: false,
      [Symbol(kSetKeepAlive)]: false,
      [Symbol(kSetKeepAliveInitialDelay)]: 0,
      [Symbol(kBytesRead)]: 0,
      [Symbol(kBytesWritten)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    _header: 'POST /cosmos/tx/v1beta1/txs HTTP/1.1\r\n' +
      'Accept: application/json, text/plain, */*\r\n' +
      'Content-Type: application/json\r\n' +
      'User-Agent: axios/0.23.0\r\n' +
      'Content-Length: 449\r\n' +
      'Host: ununifi-alpha-test-v2.cauchye.net:1317\r\n' +
      'Connection: close\r\n' +
      '\r\n',
    _keepAliveTimeout: 0,
    _onPendingData: [Function: nop],
    agent: Agent {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      defaultPort: 80,
      protocol: 'http:',
      options: [Object: null prototype],
      requests: [Object: null prototype] {},
      sockets: [Object: null prototype],
      freeSockets: [Object: null prototype] {},
      keepAliveMsecs: 1000,
      keepAlive: false,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      scheduling: 'lifo',
      maxTotalSockets: Infinity,
      totalSocketCount: 1,
      [Symbol(kCapture)]: false
    },
    socketPath: undefined,
    method: 'POST',
    maxHeaderSize: undefined,
    insecureHTTPParser: undefined,
    path: '/cosmos/tx/v1beta1/txs',
    _ended: true,
    res: IncomingMessage {
      _readableState: [ReadableState],
      _events: [Object: null prototype],
      _eventsCount: 3,
      _maxListeners: undefined,
      socket: [Socket],
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      httpVersion: '1.1',
      complete: true,
      rawHeaders: [Array],
      rawTrailers: [],
      aborted: false,
      upgrade: false,
      url: '',
      method: null,
      statusCode: 200,
      statusMessage: 'OK',
      client: [Socket],
      _consuming: true,
      _dumped: false,
      req: [Circular *1],
      responseUrl: 'http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/tx/v1beta1/txs',
      redirects: [],
      [Symbol(kCapture)]: false,
      [Symbol(kHeaders)]: [Object],
      [Symbol(kHeadersCount)]: 10,
      [Symbol(kTrailers)]: null,
      [Symbol(kTrailersCount)]: 0,
      [Symbol(RequestTimeout)]: undefined
    },
    aborted: false,
    timeoutCb: null,
    upgradeOrConnect: false,
    parser: null,
    maxHeadersCount: null,
    reusedSocket: false,
    host: 'ununifi-alpha-test-v2.cauchye.net',
    protocol: 'http:',
    _redirectable: Writable {
      _writableState: [WritableState],
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      _options: [Object],
      _ended: true,
      _ending: true,
      _redirectCount: 0,
      _redirects: [],
      _requestBodyLength: 449,
      _requestBodyBuffers: [],
      _onNativeResponse: [Function (anonymous)],
      _currentRequest: [Circular *1],
      _currentUrl: 'http://ununifi-alpha-test-v2.cauchye.net:1317/cosmos/tx/v1beta1/txs',
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false,
    [Symbol(kNeedDrain)]: false,
    [Symbol(corked)]: 0,
    [Symbol(kOutHeaders)]: [Object: null prototype] {
      accept: [Array],
      'content-type': [Array],
      'user-agent': [Array],
      'content-length': [Array],
      host: [Array]
    }
  },
  data: {
    tx_response: {
      height: '140091',
      txhash: 'F5CB783C1A1FC07490E59F46B57EBAD348AF90066B51A0D7ED877453438D2D51',
      codespace: '',
      code: 0,
      data: '12260A242F636F736D6F732E62616E6B2E763162657461312E4D736753656E64526573706F6E7365',
      raw_log: '[{"msg_index":0,"events":[{"type":"coin_received","attributes":[{"key":"receiver","value":"ununifi18y5nnx3r9s4w398sn0nqcykh2y7sx8ljd423t6"},{"key":"amount","value":"1uguu"}]},{"type":"coin_spent","attributes":[{"key":"spender","value":"ununifi18ytx2jmfp00unst6hn3hlg6vfz0praqc88q003"},{"key":"amount","value":"1uguu"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmos.bank.v1beta1.MsgSend"},{"key":"sender","value":"ununifi18ytx2jmfp00unst6hn3hlg6vfz0praqc88q003"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"ununifi18y5nnx3r9s4w398sn0nqcykh2y7sx8ljd423t6"},{"key":"sender","value":"ununifi18ytx2jmfp00unst6hn3hlg6vfz0praqc88q003"},{"key":"amount","value":"1uguu"}]}]}]',
      logs: [Array],
      info: '',
      gas_wanted: '0',
      gas_used: '0',
      tx: null,
      timestamp: '',
      events: [Array]
    }
  }
}
```

</details>
