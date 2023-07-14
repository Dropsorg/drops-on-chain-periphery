import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/2-deploy-ChainlinkPriceFactory.ts
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
    proxy: {
      owner: deployer,
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        methodName: 'initialize',
        args: [],
      },
    },
    log: true,
  });
};

export default deployChainlinkPriceFactory;
deployChainlinkPriceFactory.tags = ['ChainlinkPriceFactory'];
