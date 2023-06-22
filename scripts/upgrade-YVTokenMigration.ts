import { ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  console.log('yvTokenMigration upgrade started');
  const proxyAdmin = await ethers.getContract('DefaultProxyAdmin');
  console.log('proxyAdmin: ', proxyAdmin.address);
  const transparentProxy = await ethers.getContract('YVTokenMigration_Proxy');
  console.log('transparentProxy: ', transparentProxy.address);

  const yvTokenMigrationV2 = await ethers.getContract('YVTokenMigration');
  console.log('yvTokenMigrationV2: ', yvTokenMigrationV2.address);
  const upgradeTx: ContractTransaction = await proxyAdmin.upgrade(
    transparentProxy.address,
    yvTokenMigrationV2.address
  );
  await upgradeTx.wait(1);
  console.log('yvTokenMigration upgrade ended');
}

main();
