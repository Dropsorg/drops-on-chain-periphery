import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/7-deploy-AuraLPMigration.ts
const deployAuraLPMigration: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  // wst-WETH
  const auraPool = '0x59d66c58e83a26d6a0e35114323f65c3945c89c1';
  const compoudingVault = '0xe9738c244ab22071ca81e5553ffe2ac94898c01c';
  const auraMarket = '0xa0eab20aA091cb03f82410586b8e270f19B04A00';

  await deploy('AuraLPMigration', {
    from: deployer,
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
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
