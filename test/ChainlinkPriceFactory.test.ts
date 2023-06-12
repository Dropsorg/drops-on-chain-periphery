import { ethers } from 'hardhat';
import { expect } from 'chai';

import { ChainlinkPriceFactory } from '../types';
import { deployContract } from '../helpers/contract';

const stETHOracles = {
  address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
  ethAggregator: '0x86392dC19c0b719886221c78AB11eb8Cf5c52812',
  usdAggregator: '0xCfE54B5cD566aB89272946F602D76Ea879CAb4a8',
};

describe('ChainlinkPriceFactory', async () => {
  let ChainlinkPriceFactory: ChainlinkPriceFactory;
  let accounts: any[];

  beforeEach(async () => {
    ChainlinkPriceFactory = await deployContract<ChainlinkPriceFactory>(
      'ChainlinkPriceFactory',
      []
    );
    accounts = await ethers.getSigners();
  });

  it('via ETH aggregator', async () => {
    await ChainlinkPriceFactory.setETHAggregator(stETHOracles.address, stETHOracles.ethAggregator);
    const price = await ChainlinkPriceFactory.getUSDPrice(stETHOracles.address);
    console.log('usd price: ', price.toString());
  });

  it('via USD aggregator', async () => {
    await ChainlinkPriceFactory.setUSDAggregator(stETHOracles.address, stETHOracles.usdAggregator);
    const price = await ChainlinkPriceFactory.getUSDPrice(stETHOracles.address);
    console.log('usd price: ', price.toString());
  });
});
