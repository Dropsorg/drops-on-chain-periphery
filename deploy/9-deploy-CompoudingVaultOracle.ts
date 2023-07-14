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

  await deploy('CompoudingVaultOracle', {
    from: deployer,
    args: [
      // '0xe9738c244aB22071cA81E5553Ffe2aC94898C01c', // wstETH-WETH lp vault
      // '0xca4aC6a5aa66A40f8A263E7B4CAAC6a9dff0285B', // wstETH-WETH lp oracle

      '0x79edCDB9C581b6945F321F2cd6B307a257113DEE', // rETH-ETH lp vault
      '0x83fEE6fFdcc669dB9CCef9Fa452FF0984422d740', // rETH-ETH lp oracle
    ],
    log: true,
  });
};

export default deployCompoudingVaultOracle;
deployCompoudingVaultOracle.tags = ['CompoudingVaultOracle'];
