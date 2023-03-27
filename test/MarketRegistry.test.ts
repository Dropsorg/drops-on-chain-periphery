import { ethers } from 'hardhat';
import { expect } from 'chai';

import { MarketRegistry } from '../types';
import { deployContract } from '../helpers/contract';

export const MarketType = {
  TOKEN_POOL: 0,
  NFT_POOL: 1,
  OTHER_POOL: 2,
};

describe('MarketRegistry', async () => {
  let MarketRegistry: MarketRegistry;
  let accounts: any[];

  beforeEach(async () => {
    MarketRegistry = await deployContract<MarketRegistry>('MarketRegistry', []);
    accounts = await ethers.getSigners();
  });

  it('addMarket', async () => {
    const [, user] = accounts;
    const market = (await ethers.Wallet.createRandom()).address;

    await expect(
      MarketRegistry.addMarket(ethers.constants.AddressZero, MarketType.TOKEN_POOL)
    ).to.be.revertedWith('addMarket: Invalid market address');

    await expect(
      MarketRegistry.connect(user).addMarket(market, MarketType.TOKEN_POOL)
    ).to.be.revertedWith('Ownable: caller is not the owner');

    await expect(MarketRegistry.addMarket(market, MarketType.TOKEN_POOL))
      .to.emit(MarketRegistry, 'MarketAdded')
      .withArgs(market, MarketType.TOKEN_POOL);

    const markets = await MarketRegistry.getAllMarkets();
    expect(markets.length).to.be.eq(1);
    expect(markets[0]).to.be.eq(market);

    await expect(MarketRegistry.addMarket(market, MarketType.TOKEN_POOL)).to.be.revertedWith(
      'addMarket: Already Registered'
    );
  });

  it('removeMarket', async () => {
    const [, user] = accounts;
    const market1 = (await ethers.Wallet.createRandom()).address;
    const market2 = (await ethers.Wallet.createRandom()).address;

    await expect(MarketRegistry.removeMarket(ethers.constants.AddressZero)).to.be.revertedWith(
      'removeMarket: Invalid market address'
    );

    await expect(MarketRegistry.connect(user).removeMarket(market1)).to.be.revertedWith(
      'Ownable: caller is not the owner'
    );

    await expect(MarketRegistry.removeMarket(market2)).to.be.revertedWith(
      'removeMarket: Not Registered'
    );

    await MarketRegistry.addMarket(market1, MarketType.TOKEN_POOL);
    await MarketRegistry.addMarket(market2, MarketType.NFT_POOL);

    await expect(MarketRegistry.removeMarket(market1))
      .to.emit(MarketRegistry, 'MarketRemoved')
      .withArgs(market1);

    await expect(MarketRegistry.removeMarket(market1)).to.be.revertedWith(
      'removeMarket: Not Registered'
    );

    const markets = await MarketRegistry.getAllMarkets();
    expect(markets.length).to.be.eq(1);
    expect(markets[0]).to.be.eq(market2);
  });

  it('updateMarketType', async () => {
    const [, user] = accounts;
    const market = (await ethers.Wallet.createRandom()).address;

    await expect(
      MarketRegistry.updateMarketType(ethers.constants.AddressZero, MarketType.TOKEN_POOL)
    ).to.be.revertedWith('updateMarketType: Invalid market address');

    await expect(
      MarketRegistry.connect(user).updateMarketType(market, MarketType.TOKEN_POOL)
    ).to.be.revertedWith('Ownable: caller is not the owner');

    await expect(MarketRegistry.updateMarketType(market, MarketType.TOKEN_POOL)).to.be.revertedWith(
      'updateMarketType: Not Registered'
    );

    await MarketRegistry.addMarket(market, MarketType.TOKEN_POOL);

    await expect(MarketRegistry.updateMarketType(market, MarketType.TOKEN_POOL)).to.be.revertedWith(
      'updateMarketType: Not new type'
    );

    await expect(MarketRegistry.updateMarketType(market, MarketType.NFT_POOL))
      .to.emit(MarketRegistry, 'MarketTypeUpdated')
      .withArgs(market, MarketType.NFT_POOL);
  });
});
