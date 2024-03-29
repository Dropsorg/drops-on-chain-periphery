import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/3-deploy-YVTokenPriceOracle.ts
const deployYVTokenPriceOracle: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const factory = '0x4148D2220511d3521E232ff0F6369a14A9737c9A';
  const yvUSDC = '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE';
  const yvUSDT = '0x3B27F92C0e212C671EA351827EDF93DB27cc0c65';
  const yvDAI = '0xdA816459F1AB5631232FE5e97a05BBBb94970c95';
  const yvWETH = '0xa258C4606Ca8206D8aA700cE2143D7db854D168c';

  await deploy('YVTokenPriceOracle', {
    from: deployer,
    args: [factory, yvWETH],
    log: true,
  });
};

export default deployYVTokenPriceOracle;
deployYVTokenPriceOracle.tags = ['YVTokenPriceOracle'];
