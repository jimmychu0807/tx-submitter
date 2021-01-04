const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

// Substrate connection config
const WEB_SOCKET = 'ws://localhost:9944';
const TYPES = {};
const ALICE = '//Alice';
const BOB = '//Bob';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const connectSubstrate = async () => {
  const wsProvider = new WsProvider(WEB_SOCKET);
  const api = await ApiPromise.create({ provider: wsProvider, types: TYPES });
  return api;
};

const main = async () => {
	console.log('Running tx-submitter');

	const api = await connectSubstrate();
	const keyring = new Keyring({ type: 'sr25519' });

	console.log('Connected to Substrate');

	const txAmt = 1000;

	const alice = keyring.addFromUri(ALICE);
	const bob = keyring.addFromUri(BOB);

	const unsub = await api.tx.balances.transfer(bob.address, txAmt)
		.signAndSend(alice, res => {
			// if (!res.status.isFinalized) return;
			// console.log('transer completed', res);
			console.log(`status: ${res.status}`);
		})

	await sleep(12000);
	unsub();
};

main()
	.then(() => {
		console.log("successfully exited");
		process.exit(0);
	})
	.catch(err => {
		console.log('error occur:', err);
		process.exit(1);
	})
