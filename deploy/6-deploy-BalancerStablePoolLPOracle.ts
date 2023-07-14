import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/6-deploy-BalancerStablePoolLPOracle.ts
const deployBalancerStablePoolLPOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('BalancerStablePoolLPOracle', {
    from: deployer,
    args: [
      '0x4148D2220511d3521E232ff0F6369a14A9737c9A', // factory
      // '0x32296969Ef14EB0c6d29669C550D4a0449130230', // Balancer stETH Stable Pool
      '0x1E19CF2D73a72Ef1332C882F20534B6519Be0276', // Balancer rETH Stable Pool
    ],
    log: true,
  });
};

export default deployBalancerStablePoolLPOracle;
deployBalancerStablePoolLPOracle.tags = ['BalancerStablePoolLPOracle'];
