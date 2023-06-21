import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/6-deploy-BalancerStablePoolLPOracle.ts
const deployBalancerStablePoolLPOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const factoryAddr = '0xB08742E82cC6743D8a1Cf2473aD36c9Ea9D477fD';
  const BalancerPoolAddr = '0x1E19CF2D73a72Ef1332C882F20534B6519Be0276';

  await deploy('BalancerStablePoolLPOracle', {
    from: deployer,
    args: [factoryAddr, BalancerPoolAddr],
    log: true,
  });
};

export default deployBalancerStablePoolLPOracle;
deployBalancerStablePoolLPOracle.tags = ['BalancerStablePoolLPOracle'];
