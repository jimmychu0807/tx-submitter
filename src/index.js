const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

// Substrate connection config
const WEB_SOCKET = 'ws://localhost:9944';
const TYPES = {};

// This script will wait for n secs before stopping itself
const LASTING_SECS = 30;

const ALICE = '//Alice';
const BOB = '//Bob';
// This is sending txs / sec, the least is 1 tx/s
const TX_FREQUENCY = 200;

// This is 100 Unit
const TX_AMT = 100000000000000;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const connectSubstrate = async () => {
  const wsProvider = new WsProvider(WEB_SOCKET);
  const api = await ApiPromise.create({ provider: wsProvider, types: TYPES });
  return api;
};

// This function returns a tx unsubcription handler
const submitTx = async (api, src, dest, amt, txCnt, nonce) =>
	await api.tx.balances.transfer(dest.address, amt)
		.signAndSend(src, { nonce }, res => {
			console.log(`Tx ${txCnt} status: ${res.status}`);
		});

const main = async () => {
	const api = await connectSubstrate();
	const keyring = new Keyring({ type: 'sr25519' });
	console.log('Connected to Substrate');

	let txCnt = 0;
	let nonce = 0;
	const alice = keyring.addFromUri(ALICE);
	const bob = keyring.addFromUri(BOB);

	setInterval(() => {
		txCnt += 1;
		submitTx(api, alice, bob, TX_AMT, txCnt, nonce);
		nonce += 1;
	}, 1000/TX_FREQUENCY);

	await sleep(LASTING_SECS * 1000);
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
