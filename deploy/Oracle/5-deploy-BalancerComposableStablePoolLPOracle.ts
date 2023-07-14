import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/5-deploy-BalancerComposableStablePoolLPOracle.ts
const deployBalancerComposableStablePoolLPOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('BalancerComposableStablePoolLPOracle', {
    from: deployer,
    args: [
      '0x4148D2220511d3521E232ff0F6369a14A9737c9A', // factory
      '0x5aEe1e99fE86960377DE9f88689616916D5DcaBe',
      'wstETH-rETH-sfrxETH StablePool Oracle',
    ],
    log: true,
  });
};

export default deployBalancerComposableStablePoolLPOracle;
deployBalancerComposableStablePoolLPOracle.tags = ['BalancerComposableStablePoolLPOracle'];
