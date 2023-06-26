import { ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  console.log('auraLPMigration upgrade started');
  const proxyAdmin = await ethers.getContract('DefaultProxyAdmin');
  console.log('proxyAdmin: ', proxyAdmin.address);
  const transparentProxy = await ethers.getContract('AuraLPMigration_Proxy');
  console.log('transparentProxy: ', transparentProxy.address);

  const auraLPMigrationV2 = await ethers.getContract('AuraLPMigration');
  console.log('auraLPMigrationV2: ', auraLPMigrationV2.address);
  const upgradeTx: ContractTransaction = await proxyAdmin.upgrade(
    transparentProxy.address,
    auraLPMigrationV2.address
  );
  await upgradeTx.wait(1);
  console.log('auraLPMigration upgrade ended');
}

main();
