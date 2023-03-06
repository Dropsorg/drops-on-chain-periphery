import { XTokenOracle } from '../types';
import { deployContract } from '../helpers/contract';

const POOL_ONE = [
  {
    name: 'xCryptoPunk',
    vaultId: 0,
    oracle: '0xc446702FC3568d26bb664cb4Af56BA2993DfA018',
    inventoryStaking: '0x3e135c3e981fae3383a5ae0d323860a34cfab893',
  },
  {
    name: 'xMeeBites',
    vaultId: 7,
    oracle: '0x29Ea94760f211A338eCef4a31F09d8Cef1795755',
    inventoryStaking: '0x3e135c3e981fae3383a5ae0d323860a34cfab893',
  },
];

const POOL_TWO = [
  {
    name: 'xMilady',
    vaultId: 392,
    oracle: '0xf04205d907aD314c717EFec0d2D3d97626130E19',
    inventoryStaking: '0x3e135c3e981fae3383a5ae0d323860a34cfab893',
  },
  {
    name: 'xWizard',
    vaultId: 24,
    oracle: '0x4da2765FFCFC0eEd625F450B9A1A1C89c919DbE8',
    inventoryStaking: '0x3e135c3e981fae3383a5ae0d323860a34cfab893',
  },
];

const POOL_THREE = [
  {
    name: 'xSQGL',
    vaultId: 27,
    oracle: '0xEbF67AB8cFF336D3F609127E8BbF8BD6DD93cd81',
    inventoryStaking: '0x3e135c3e981fae3383a5ae0d323860a34cfab893',
  },
];

describe('XTokenOracle', async () => {
  it('POOL_ONE', async () => {
    for (let i = 0; i < POOL_ONE.length; i++) {
      const XTokenOracle = await deployContract<XTokenOracle>('XTokenOracle', [
        POOL_ONE[i].vaultId,
        POOL_ONE[i].oracle,
        POOL_ONE[i].inventoryStaking,
      ]);

      console.log(
        `${POOL_ONE[i].name} oracle price is: `,
        (await XTokenOracle.latestAnswer()).toString(),
        `${POOL_ONE[i].name} oracle decimals is: `,
        (await XTokenOracle.decimals()).toString()
      );
    }
  });

  it('POOL_TWO', async () => {
    for (let i = 0; i < POOL_TWO.length; i++) {
      const XTokenOracle = await deployContract<XTokenOracle>('XTokenOracle', [
        POOL_TWO[i].vaultId,
        POOL_TWO[i].oracle,
        POOL_TWO[i].inventoryStaking,
      ]);

      console.log(
        `${POOL_TWO[i].name} oracle price is: `,
        (await XTokenOracle.latestAnswer()).toString(),
        `${POOL_ONE[i].name} oracle decimals is: `,
        (await XTokenOracle.decimals()).toString()
      );
    }
  });

  it('POOL_THREE', async () => {
    for (let i = 0; i < POOL_THREE.length; i++) {
      const XTokenOracle = await deployContract<XTokenOracle>('XTokenOracle', [
        POOL_THREE[i].vaultId,
        POOL_THREE[i].oracle,
        POOL_THREE[i].inventoryStaking,
      ]);

      console.log(
        `${POOL_THREE[i].name} oracle price is: `,
        (await XTokenOracle.latestAnswer()).toString(),
        `${POOL_ONE[i].name} oracle decimals is: `,
        (await XTokenOracle.decimals()).toString()
      );
    }
  });
});
