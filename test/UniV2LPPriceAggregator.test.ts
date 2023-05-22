import { UniV2LPPriceAggregator } from '../types';
import { deployContract } from '../helpers/contract';

const POOL_ONE = [
  {
    name: 'PUNKWETH',
    pair: '0x0463a06fbc8bf28b3f120cd1bfc59483f099d332',
    token: '0x269616d549d7e8eaa82dfb17028d0b212d11232a',
    oracle: '0xc446702FC3568d26bb664cb4Af56BA2993DfA018',
  },
  {
    name: 'MeeBitesWeth',
    pair: '0xe339c1d0a744053cbceb0d2dc2d13967c8a69586',
    token: '0x641927e970222b10b2e8cdbc96b1b4f427316f16',
    oracle: '0x29Ea94760f211A338eCef4a31F09d8Cef1795755',
  },
];

const POOL_TWO = [
  {
    name: 'MiladyWeth',
    pair: '0x15A8E38942F9e353BEc8812763fb3C104c89eCf4',
    token: '0x227c7DF69D3ed1ae7574A1a7685fDEd90292EB48',
    oracle: '0xf04205d907aD314c717EFec0d2D3d97626130E19',
  },
  {
    name: 'WizardWeth',
    pair: '0x0A2F9b5360b5C7b6D3CE826971425B3b8B766519',
    token: '0x87931E7AD81914e7898d07c68F145fC0A553D8Fb',
    oracle: '0x4da2765FFCFC0eEd625F450B9A1A1C89c919DbE8',
  },
];

const POOL_THREE = [
  {
    name: 'SQGLWETH',
    pair: '0x698AbbBC986C59D02941E18BC96fe2396493339B',
    token: '0x8d137e3337eb1B58A222Fef2B2Cc7C423903d9cf',
    oracle: '0xEbF67AB8cFF336D3F609127E8BbF8BD6DD93cd81',
  },
];

describe('UniV2LPPriceAggregator', async () => {
  it('POOL_ONE', async () => {
    for (let i = 0; i < POOL_ONE.length; i++) {
      const UniV2LPPriceAggregator = await deployContract<UniV2LPPriceAggregator>(
        'UniV2LPPriceAggregator',
        [POOL_ONE[i].pair, POOL_ONE[i].token, POOL_ONE[i].oracle]
      );

      console.log(
        `${POOL_ONE[i].name} oracle price is: `,
        (await UniV2LPPriceAggregator.latestAnswer()).toString()
      );

      console.log(
        `${POOL_ONE[i].name} oracle decimals is: `,
        (await UniV2LPPriceAggregator.decimals()).toString()
      );
    }
  });

  it('POOL_TWO', async () => {
    for (let i = 0; i < POOL_TWO.length; i++) {
      const UniV2LPPriceAggregator = await deployContract<UniV2LPPriceAggregator>(
        'UniV2LPPriceAggregator',
        [POOL_TWO[i].pair, POOL_TWO[i].token, POOL_TWO[i].oracle]
      );

      console.log(
        `${POOL_TWO[i].name} oracle price is: `,
        (await UniV2LPPriceAggregator.latestAnswer()).toString()
      );
      console.log(
        `${POOL_TWO[i].name} oracle decimals is: `,
        (await UniV2LPPriceAggregator.decimals()).toString()
      );
    }
  });

  it('POOL_THREE', async () => {
    for (let i = 0; i < POOL_THREE.length; i++) {
      const UniV2LPPriceAggregator = await deployContract<UniV2LPPriceAggregator>(
        'UniV2LPPriceAggregator',
        [POOL_THREE[i].pair, POOL_THREE[i].token, POOL_THREE[i].oracle]
      );

      console.log(
        `${POOL_THREE[i].name} oracle price is: `,
        (await UniV2LPPriceAggregator.latestAnswer()).toString()
      );
      console.log(
        `${POOL_THREE[i].name} oracle decimals is: `,
        (await UniV2LPPriceAggregator.decimals()).toString()
      );
    }
  });
});
