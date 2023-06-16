import { ethers } from 'hardhat';
import { expect } from 'chai';

import { ChainlinkPriceFactory, WstETHWETHBalancerLPOracle } from '../types';
import { deployContract } from '../helpers/contract';

const stETH = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84';
const stETH_ETH_chainlink_aggregator = '0x86392dC19c0b719886221c78AB11eb8Cf5c52812';

describe('WstETHWETHBalancerLPOracle', async () => {
  let WstETHWETHBalancerLPOracle: WstETHWETHBalancerLPOracle;
  let ChainlinkPriceFactory: ChainlinkPriceFactory;

  let accounts: any[];

  it('wst-weth balancer LP', async () => {
    accounts = await ethers.getSigners();

    ChainlinkPriceFactory = await deployContract<ChainlinkPriceFactory>(
      'ChainlinkPriceFactory',
      []
    );

    WstETHWETHBalancerLPOracle = await deployContract<WstETHWETHBalancerLPOracle>(
      'WstETHWETHBalancerLPOracle',
      []
    );

    await ChainlinkPriceFactory.setETHAggregator(stETH, stETH_ETH_chainlink_aggregator);

    const ethPrice = await WstETHWETHBalancerLPOracle.latestAnswer();
    console.log('ethPrice: ', ethPrice.toString());
  });
});
