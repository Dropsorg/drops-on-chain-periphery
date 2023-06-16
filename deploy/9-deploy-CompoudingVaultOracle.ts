import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/9-deploy-CompoudingVaultOracle.ts
const deployCompoudingVaultOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const vault = '0xe9738c244ab22071ca81e5553ffe2ac94898c01c';
  const oracle = '0x023F638f718758752548d407De4b2f93D5Bcb66B';

  await deploy('CompoudingVaultOracle', {
    from: deployer,
    args: [vault, oracle],
    log: true,
  });
};

export default deployCompoudingVaultOracle;
deployCompoudingVaultOracle.tags = ['CompoudingVaultOracle'];
