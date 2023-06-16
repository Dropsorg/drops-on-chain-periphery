import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/10-deploy-WstETHWETHBalancerLPOracle.ts
const deployWstETHWETHBalancerLPOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('WstETHWETHBalancerLPOracle', {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployWstETHWETHBalancerLPOracle;
deployWstETHWETHBalancerLPOracle.tags = ['WstETHWETHBalancerLPOracle'];
