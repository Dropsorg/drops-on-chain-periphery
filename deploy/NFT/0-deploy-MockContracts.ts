import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { network } from 'hardhat';

// deploy/0-deploy-MockContracts.ts
const deployMockContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  if ('mainnet' in network.tags) return;

  await deploy('MockERC20', {
    from: deployer,
    args: [],
    log: true,
  });

  const token = (await get('MockERC20')).address;

  // MockAuraBaseRewardPool
  await deploy('MockAuraBaseRewardPool', {
    from: deployer,
    args: [token],
    log: true,
  });

  // MockCompoudingVault
  await deploy('MockCompoudingVault', {
    from: deployer,
    args: [token],
    log: true,
  });
};

export default deployMockContracts;
deployMockContracts.tags = ['MockContracts'];
