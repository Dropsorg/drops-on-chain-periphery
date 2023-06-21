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

  const vault = '0x83fEE6fFdcc669dB9CCef9Fa452FF0984422d740';
  const lpOracle = '0x81e6Add49aEf0772E1985a65fd8611E18BD51540';

  await deploy('CompoudingVaultOracle', {
    from: deployer,
    args: [vault, lpOracle],
    log: true,
  });
};

export default deployCompoudingVaultOracle;
deployCompoudingVaultOracle.tags = ['CompoudingVaultOracle'];
