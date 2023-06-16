import { ethers } from 'hardhat';

import { CompoudingVaultOracle } from '../types';
import { deployContract } from '../helpers/contract';

const stETH_WETH_Vault = '0xe9738c244ab22071ca81e5553ffe2ac94898c01c';
const stETH_WETH_LP_Oracle = '0x023F638f718758752548d407De4b2f93D5Bcb66B';

describe('CompoudingVaultOracle', async () => {
  let accounts: any[];

  it('wst-weth balancer LP vautl shares', async () => {
    accounts = await ethers.getSigners();

    const CompoudingVaultOracle = await deployContract<CompoudingVaultOracle>(
      'CompoudingVaultOracle',
      [stETH_WETH_Vault, stETH_WETH_LP_Oracle]
    );

    const ethPrice = await CompoudingVaultOracle.latestAnswer();
    console.log('ethPrice: ', ethPrice.toString());
  });
});
