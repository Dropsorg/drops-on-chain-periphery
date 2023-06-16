import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/7-deploy-AuraLPMigration.ts
const deployAuraLPMigration: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  // wst-WETH
  const auraPool = '0x59d66c58e83a26d6a0e35114323f65c3945c89c1';
  const compoudingVault = '0xe9738c244ab22071ca81e5553ffe2ac94898c01c';
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
