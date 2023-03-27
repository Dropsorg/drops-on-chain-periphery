import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/0-deploy-MarketRegistry.ts
const deployUniV2LPPriceOracle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('MarketRegistry', {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployUniV2LPPriceOracle;
deployUniV2LPPriceOracle.tags = ['MarketRegistry'];
