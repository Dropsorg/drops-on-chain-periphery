import { ethers, upgrades } from 'hardhat';

const PROXY = '0xA20334757e7bb2aF2617ae4AdD25e6ed24886a40';

async function main() {
  const AuraLPMigrationV2 = await ethers.getContractFactory('AuraLPMigration');
  console.log('Upgrading AuraLPMigration');
  await upgrades.upgradeProxy(PROXY, AuraLPMigrationV2);
  console.log('AuraLPMigration is successfully upgraded');
}

main();
