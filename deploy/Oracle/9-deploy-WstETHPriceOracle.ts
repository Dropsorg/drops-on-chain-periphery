import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/9-deploy-WstETHPriceOracle.ts
const WstETHPriceOracle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('WstETHPriceOracle', {
    from: deployer,
    args: [],
    log: true,
  });
};

export default WstETHPriceOracle;
WstETHPriceOracle.tags = ['WstETHPriceOracle'];
