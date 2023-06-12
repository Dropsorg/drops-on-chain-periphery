import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/4-deploy-ChainlinkPriceFactory.ts
const deployChainlinkPriceFactory: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('ChainlinkPriceFactory', {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployChainlinkPriceFactory;
deployChainlinkPriceFactory.tags = ['ChainlinkPriceFactory'];
