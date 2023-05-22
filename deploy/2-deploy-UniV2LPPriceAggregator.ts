import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/0-deploy-UniV2LPPriceAggregator.ts
const deployUniV2LPPriceOracle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('UniV2LPPriceAggregator', {
    from: deployer,
    args: [
      '0x698AbbBC986C59D02941E18BC96fe2396493339B', // pair
      '0x8d137e3337eb1B58A222Fef2B2Cc7C423903d9cf', // token
      '0xEbF67AB8cFF336D3F609127E8BbF8BD6DD93cd81', // orale
    ],
    log: true,
  });
};

export default deployUniV2LPPriceOracle;
deployUniV2LPPriceOracle.tags = ['UniV2LPPriceAggregator'];
