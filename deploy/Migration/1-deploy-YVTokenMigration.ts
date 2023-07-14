import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const data = [
  {
    symbol: 'USDC',
    yearnVault: '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE',
    dropsMarket: '0x23dEBe55E473279Fa8189c22a2c8f08AfbeF39e0',
  },
  {
    symbol: 'USDT',
    yearnVault: '0x3B27F92C0e212C671EA351827EDF93DB27cc0c65',
    dropsMarket: '0xF63f89F6463550Ce4ce5B6Ca6b1323B39C90E9cB',
  },
  {
    symbol: 'DAI',
    yearnVault: '0xdA816459F1AB5631232FE5e97a05BBBb94970c95',
    dropsMarket: '0x367144a75577f7FBE80E69854046F6169eF080aC',
  },
  {
    symbol: 'WETH',
    yearnVault: '0xa258C4606Ca8206D8aA700cE2143D7db854D168c',
    dropsMarket: '0x72ab6843D4c988D74Dd8D5cdF16eF49301d87952',
  },
];

// deploy/1-deploy-YVTokenMigration.ts
const deployYVTokenMigration: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const { yearnVault, dropsMarket, symbol } = data[1];

  await deploy(`YVTokenMigration`, {
    from: deployer,
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        methodName: 'initialize',
        args: [yearnVault, dropsMarket],
      },
    },
    log: true,
  });
};

export default deployYVTokenMigration;
deployYVTokenMigration.tags = ['YVTokenMigration'];
