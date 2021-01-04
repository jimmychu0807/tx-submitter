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
			LookupSource: 'AccountId',
			weightsPerClass: {
				baseExtrinsic: 'u64',
				maxExtrinsic: 'Option<u64>',
				maxTotal: 'Option<u64>',
				reserved: 'Option<u64>'
			},
			perDispatchClass: {
				normal: 'weightsPerClass',
				operational: 'weightsPerClass',
				mandatory: 'weightsPerClass'
			},
			BlockWeights: {
				baseBlock: 'u64',
				maxBlock: 'u64',
				perClass: 'perDispatchClass',
			},
			ConsumedWeight: 'perDispatchClass',
		}
	}
}


