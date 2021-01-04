const mnemonic = "bottom drive obey lake curtain smoke basket hold race lonely fit walk";

module.exports = {
  networks: {
    test: {
      mnemonic,
      ws: "ws://127.0.0.1:9944",
    },
  },
  polkadotjs: {
    types: {
      Address: 'AccountId',
      LookupSource: 'AccountId'
    }
  }
}


