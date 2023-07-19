import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const data = [
  {
    symbol: 'wst_WETH',
    auraPool: '0x59d66c58e83a26d6a0e35114323f65c3945c89c1',
    compoudingVault: '0xe9738c244ab22071ca81e5553ffe2ac94898c01c',
    dropsMarket: '0xa0eab20aA091cb03f82410586b8e270f19B04A00',
  },
  {
    symbol: 'wstETH_rETH_sfrxETH',
    auraPool: '0xd26948e7a0223700e3c3cdea21ca2471abcb8d47',
    compoudingVault: '0xb535b34609F23173257d196f96C34cf55961BAC2',
    dropsMarket: '0xa2EDFd267e9e2f76cd54bD720927a176FAdC19A8',
  },
  {
    symbol: 'rETH_ETH',
    auraPool: '0xdd1fe5ad401d4777ce89959b7fa587e569bf125d',
    compoudingVault: '0x83fEE6fFdcc669dB9CCef9Fa452FF0984422d740',
    dropsMarket: '0x04a083C48EAAC049964129e5a3eF7d48e0f7a7e7',
  },
];

// deploy/0-deploy-AuraLPMigration.ts
const deployAuraLPMigration: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const { auraPool, compoudingVault, dropsMarket } = data[2];

  // await deploy('AuraLPMigration', {
  //   from: deployer,
  //   proxy: {
  //     owner: deployer,
  //     proxyContract: 'OpenZeppelinTransparentProxy',
  //     execute: {
  //       methodName: 'initialize',
  //       args: [auraPool, compoudingVault, dropsMarket],
  //     },
  //   },
  //   log: true,
  // });

  await deploy('AuraLPMigration', {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployAuraLPMigration;
deployAuraLPMigration.tags = ['AuraLPMigration'];
