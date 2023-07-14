import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

// deploy/7-deploy-CompoudingVaultOracle.ts
const deployCompoudingVaultOracle: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const {
    deployments: { deploy, get },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  await deploy('CompoudingVaultOracle', {
    from: deployer,
    args: [
      '0x83fEE6fFdcc669dB9CCef9Fa452FF0984422d740', // rETH-ETH lp vault
      '0x79edCDB9C581b6945F321F2cd6B307a257113DEE', // rETH-ETH lp oracle
      'Drops rETH-WETH vault oracle',
    ],
    log: true,
  });
};

export default deployCompoudingVaultOracle;
deployCompoudingVaultOracle.tags = ['CompoudingVaultOracle'];
