require("@nomicfoundation/hardhat-toolbox");
require("./Tasks/blocknumber");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  solidity: "0.8.28",
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY, // Map API key to the "sepolia" network
    },
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    chainId: 31337,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    noColors: true,
    outputFile: "gas-report.txt",
    coinmarketcap: COINMARKET_API_KEY
  },
};
