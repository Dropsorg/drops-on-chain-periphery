import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/13-deploy-SFRXETHPriceOracle.ts
const deploySFRXETHPriceOracle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('SFRXETHPriceOracle', {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deploySFRXETHPriceOracle;
deploySFRXETHPriceOracle.tags = ['SFRXETHPriceOracle'];
