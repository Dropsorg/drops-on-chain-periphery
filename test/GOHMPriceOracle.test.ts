import { ethers } from 'hardhat';

import { ChainlinkPriceFactory, GOHMPriceOracle } from '../types';
import { deployContract } from '../helpers/contract';

const factoryAddr = '0x4148D2220511d3521E232ff0F6369a14A9737c9A';
const gOHM = '0x0ab87046fbb341d058f17cbc4c1133f25a20a52f';
const OHM = '0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5';

describe('GOHMPriceOracle', async () => {
  let GOHMPriceOracle: GOHMPriceOracle;

  let accounts: any[];

  it('GOHM price', async () => {
    accounts = await ethers.getSigners();

    GOHMPriceOracle = await deployContract<GOHMPriceOracle>('GOHMPriceOracle', [
      factoryAddr,
      gOHM,
      OHM,
    ]);

    const ethPrice = await GOHMPriceOracle.latestAnswer();
    console.log('ethPrice: ', ethPrice.toString());
  });
});
