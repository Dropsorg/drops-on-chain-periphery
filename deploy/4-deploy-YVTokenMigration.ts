import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/8-deploy-YVTokenMigration.ts
const deployYVTokenMigration: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const yVault = '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE';
  const yearnMarket = '0x23dEBe55E473279Fa8189c22a2c8f08AfbeF39e0';

  await deploy('YVTokenMigration', {
    from: deployer,
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
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
