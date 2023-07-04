import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/12-deploy-GOHMPriceOracle.ts
const deployGOHMPriceOracle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const factoryAddr = '0xB08742E82cC6743D8a1Cf2473aD36c9Ea9D477fD';
  const gOHM = '0x0ab87046fbb341d058f17cbc4c1133f25a20a52f';
  const OHM = '0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5';

  await deploy('GOHMPriceOracle', {
    from: deployer,
    args: [factoryAddr, gOHM, OHM],
    log: true,
  });
};

export default deployGOHMPriceOracle;
deployGOHMPriceOracle.tags = ['GOHMPriceOracle'];
