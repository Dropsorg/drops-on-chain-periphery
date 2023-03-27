import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-deploy';
import 'solidity-coverage';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';

import { HardhatUserConfig } from 'hardhat/types';
import { task } from 'hardhat/config';

require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.4',
  settings: {
    optimizer: {
      enabled: true,
      runs: 500,
    },
  },
  typechain: {
    outDir: 'types/',
    target: 'ethers-v5',
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      forking: {
        url: process.env.MAINNET_PROVIDER_URL as string,
      },
    },
    mainnet: {
      url: process.env.MAINNET_PROVIDER_URL as string,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: process.env.GOERLI_PROVIDER_URI as string,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [],
  },
} as HardhatUserConfig;
