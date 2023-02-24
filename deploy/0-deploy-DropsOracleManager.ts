import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/0-deploy-NFTOracleManager.ts
const deployNFTOracleManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('NFTOracleManager', {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployNFTOracleManager;
deployNFTOracleManager.tags = ['NFTOracleManager'];
