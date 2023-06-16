import { ChainlinkPriceFactory, YVTokenPriceOracle } from '../types';
import { deployContract } from '../helpers/contract';

const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const USDC_ETH_Chainlink = '0x986b5E1e1755e3C2440e960477f25201B0a8bbD4';
const yvUSDC = '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE';

const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const USDT_ETH_Chainlink = '0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46';
const yvUSDT = '0x3B27F92C0e212C671EA351827EDF93DB27cc0c65';

const DAI = '0x6b175474e89094c44da98b954eedeac495271d0f';
const DAI_ETH_Chainlink = '0x773616E4d11A78F511299002da57A0a94577F1f4';
const yvDAI = '0xdA816459F1AB5631232FE5e97a05BBBb94970c95';

const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const WETH_USD_Chainlink = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
const yvWETH = '0xa258C4606Ca8206D8aA700cE2143D7db854D168c';

describe('YVTokenPriceOracle', async () => {
  it('YVTokenPriceOracle prices', async () => {
    const ChainlinkPriceFactory = await deployContract<ChainlinkPriceFactory>(
      'ChainlinkPriceFactory',
      []
    );

    await ChainlinkPriceFactory.setETHAggregator(USDC, USDC_ETH_Chainlink);
    await ChainlinkPriceFactory.setETHAggregator(USDT, USDT_ETH_Chainlink);
    await ChainlinkPriceFactory.setETHAggregator(DAI, DAI_ETH_Chainlink);
    await ChainlinkPriceFactory.setUSDAggregator(WETH, WETH_USD_Chainlink);

    const yvUSDCOracle = await deployContract<YVTokenPriceOracle>('YVTokenPriceOracle', [
      ChainlinkPriceFactory.address,
      yvUSDC,
    ]);
    console.log('yvUSDCOracle: ', (await yvUSDCOracle.latestAnswer()).toString());

    const yvUSDTOracle = await deployContract<YVTokenPriceOracle>('YVTokenPriceOracle', [
      ChainlinkPriceFactory.address,
      yvUSDT,
    ]);
    console.log('yvUSDTOracle: ', (await yvUSDTOracle.latestAnswer()).toString());

    const yvDAIOracle = await deployContract<YVTokenPriceOracle>('YVTokenPriceOracle', [
      ChainlinkPriceFactory.address,
      yvDAI,
    ]);
    console.log('yvDAIOracle: ', (await yvDAIOracle.latestAnswer()).toString());

    const yvWETHOracle = await deployContract<YVTokenPriceOracle>('YVTokenPriceOracle', [
      ChainlinkPriceFactory.address,
      yvWETH,
    ]);
    console.log('yvWETHOracle: ', (await yvWETHOracle.latestAnswer()).toString());
  });
});
