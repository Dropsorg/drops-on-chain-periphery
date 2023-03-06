import { ethers } from 'hardhat';
import { Contract } from 'ethers';

export const deployContract = async <ContractType extends Contract>(
  contractName: string,
  args: any[],
  libraries?: {}
) => {
  const contract = (await (
    await ethers.getContractFactory(contractName, {
      libraries: {
        ...libraries,
      },
    })
  ).deploy(...args)) as ContractType;

  return contract;
};
