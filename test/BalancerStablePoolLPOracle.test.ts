import { ethers } from 'hardhat';
import { expect } from 'chai';

import { ChainlinkPriceFactory, BalancerStablePoolLPOracle } from '../types';
import { deployContract } from '../helpers/contract';

const stETH = '0xae7ab96520de3a18e5e111b5eaab095312d7fe84';
const stETH_ETH_chainlink_aggregator = '0x86392dC19c0b719886221c78AB11eb8Cf5c52812';
const wETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const wETH_USD_chainlink_aggregator = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
const stETH_ETH_balancer_pool = '0x32296969ef14eb0c6d29669c550d4a0449130230';

describe('BalancerStablePoolLPOracle', async () => {
  let BalancerStablePoolLPOracle: BalancerStablePoolLPOracle;
  let ChainlinkPriceFactory: ChainlinkPriceFactory;

  let accounts: any[];

  it('wst-weth balancer LP', async () => {
    accounts = await ethers.getSigners();

    ChainlinkPriceFactory = await deployContract<ChainlinkPriceFactory>(
      'ChainlinkPriceFactory',
      []
    );

    BalancerStablePoolLPOracle = await deployContract<BalancerStablePoolLPOracle>(
      'BalancerStablePoolLPOracle',
      [ChainlinkPriceFactory.address, stETH_ETH_balancer_pool]
    );

    await ChainlinkPriceFactory.setETHAggregator(stETH, stETH_ETH_chainlink_aggregator);
    await ChainlinkPriceFactory.setUSDAggregator(wETH, wETH_USD_chainlink_aggregator);

    const ethPrice = await BalancerStablePoolLPOracle.latestAnswer();
    console.log('ethPrice: ', ethPrice.toString());
  });
});
