require('dotenv').config();
const { PRIVKEY, MPRIVKEY, PROJECT_ID, ETHERSCANAPI } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    mainnet: {
      provider: () =>
        new HDWalletProvider(MPRIVKEY, `https://mainnet.infura.io/v3/${PROJECT_ID}`
        ),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    goerli: {
      provider: () => new HDWalletProvider(PRIVKEY, `https://goerli.infura.io/v3/${PROJECT_ID}`),
      network_id: 5,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  compilers: {
    solc: {
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1
        },
        //evmVersion: "london"
      }
    }
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: ETHERSCANAPI,
  },
};
