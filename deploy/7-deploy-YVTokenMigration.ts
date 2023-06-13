import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/7-deploy-YVTokenMigration.ts
const deployYVTokenMigration: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const yVault = '';
  const yearnMarket = '';

  await deploy('YVTokenMigration', {
    from: deployer,
    args: [],
    proxy: {
      execute: {
        methodName: 'initialize',
        args: [yVault, yearnMarket],
      },
    },
    log: true,
  });
};

export default deployYVTokenMigration;
deployYVTokenMigration.tags = ['YVTokenMigration'];
