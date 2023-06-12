import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/4-deploy-BalancerStablePoolLPOracle.ts
const deployBalancerStablePoolLPOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const factoryAddr = (await get('ChainlinkPriceFactory')).address;
  const BalancerPoolAddr = '';

  await deploy('BalancerStablePoolLPOracle', {
    from: deployer,
    args: [factoryAddr, BalancerPoolAddr],
    log: true,
  });
};

export default deployBalancerStablePoolLPOracle;
deployBalancerStablePoolLPOracle.tags = ['BalancerStablePoolLPOracle'];
