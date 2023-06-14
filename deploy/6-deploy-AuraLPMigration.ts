import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/6-deploy-AuraLPMigration.ts
const deployAuraLPMigration: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const compoudingVault = '';
  const auraPool = '';
  const auraMarket = '';

  await deploy('AuraLPMigration', {
    from: deployer,
    args: [],
    proxy: {
      execute: {
        methodName: 'initialize',
        args: [auraPool, compoudingVault, auraMarket],
      },
    },
    log: true,
  });
};

export default deployAuraLPMigration;
deployAuraLPMigration.tags = ['AuraLPMigration'];
