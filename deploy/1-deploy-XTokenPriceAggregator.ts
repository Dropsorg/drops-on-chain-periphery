import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/0-deploy-XTokenPriceAggregator.ts
const deployXTokenPriceAggregator: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('XTokenPriceAggregator', {
    from: deployer,
    args: [
      27, // vault ID
      '0xEbF67AB8cFF336D3F609127E8BbF8BD6DD93cd81', // Oracle contract for NFT
      '0x3e135c3e981fae3383a5ae0d323860a34cfab893', // INFTX Invetory Staking
    ],
    log: true,
  });
};

export default deployXTokenPriceAggregator;
deployXTokenPriceAggregator.tags = ['XTokenPriceAggregator'];
