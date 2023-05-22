//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * @title contract for managing markets that protocol supports
 */
contract MarketRegistry is Ownable {
    enum MarketType {
        TOKEN_POOL,
        NFT_POOL,
        OTHER_POOL
    }

    struct MarketInfo {
        MarketType marketType;
        bool registered;
        uint arrayIndex;
    }

    /// @notice market address => market info
    mapping(address => MarketInfo) public marketInfo;

    /// @notice array list of markets
    address[] public markets;

    /// @notice emitted when new market is added
    event MarketAdded(address market, MarketType marketType);

    /// @notice emitted when market is removed
    event MarketRemoved(address market);

    /// @notice emitted when market type is being updated
    event MarketTypeUpdated(address market, MarketType marketType);

    /// @notice register new market
    /// @param market address of adding market
    /// @param marketType type of adding market
    function addMarket(address market, MarketType marketType) external onlyOwner {
        require(market != address(0), 'addMarket: Invalid market address');

        MarketInfo memory info = marketInfo[market];
        require(!info.registered, 'addMarket: Already Registered');

        markets.push(market);
        marketInfo[market] = MarketInfo(marketType, true, markets.length - 1);

        emit MarketAdded(market, marketType);
    }

    function _moveTheLastElementToDeletedSpot(uint idx) internal {
        uint lastElementIdx = markets.length - 1;
        MarketInfo storage info = marketInfo[markets[lastElementIdx]];

        if (idx < lastElementIdx) {
            // move the last element to the deleted spot
            markets[idx] = markets[markets.length - 1];

            // update the idx for the last element's marketInfo
            info.arrayIndex = idx;
        }

        markets.pop();
    }

    /// @notice remove market
    /// @param market address of removing market
    function removeMarket(address market) external onlyOwner {
        require(market != address(0), 'removeMarket: Invalid market address');

        MarketInfo storage info = marketInfo[market];
        require(info.registered, 'removeMarket: Not Registered');

        delete markets[info.arrayIndex]; // remove market
        _moveTheLastElementToDeletedSpot(info.arrayIndex);

        info.registered = false;
        info.arrayIndex = 0;

        emit MarketRemoved(market);
    }

    /// @notice update market type
    /// @param market address of updating market
    /// @param newMarketType new type of updating market
    function updateMarketType(address market, MarketType newMarketType) external onlyOwner {
        require(market != address(0), 'updateMarketType: Invalid market address');

        MarketInfo storage info = marketInfo[market];
        require(info.registered, 'updateMarketType: Not Registered');
        require(info.marketType != newMarketType, 'updateMarketType: Not new type');

        info.marketType = newMarketType;
        emit MarketTypeUpdated(market, newMarketType);
    }

    function getAllMarkets() external view returns (address[] memory) {
        return markets;
    }
}
