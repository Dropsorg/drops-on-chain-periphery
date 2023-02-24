//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './interfaces/IOracle.sol';
import './Withdrawable.sol';

contract NFTOracleManager is Withdrawable {
    mapping(address => address) public oracles;
    mapping(address => bool) public isManager;

    int public minChangeRate;
    int public maxChangeRate;

    event OracleSet(address nft, address oracle);
    event ManagerSet(address manager, bool status);
    event RateSet(int256 _minChangeRate, int256 _maxChangeRate);

    constructor() {
        minChangeRate = 25; // 2.5%
        maxChangeRate = 300; // 30%
    }

    function setOracle(address nft, address oracle) external onlyOwner {
        oracles[nft] = oracle;

        emit OracleSet(nft, oracle);
    }

    function setManager(address manager, bool status) external onlyOwner {
        isManager[manager] = status;

        emit ManagerSet(manager, status);
    }

    function setRate(int min, int max) external onlyOwner {
        require(min > 0 && min < 1000 && max > 0 && max < 1000, 'setRate: Invalid Param');

        minChangeRate = min;
        maxChangeRate = max;

        emit RateSet(minChangeRate, maxChangeRate);
    }

    function updateAvailablePriceRange(
        address oracle
    ) external view returns (int256, int256, uint256) {
        int256 prevPrice = IOracle(oracle).latestAnswer();
        int256 minPrice = (prevPrice * minChangeRate) / 1000;
        int256 maxPrice = (prevPrice * maxChangeRate) / 1000;

        return (minPrice, maxPrice, IOracle(oracle).latestRound() + 1);
    }

    function batchUpdate(address[] memory nfts, int256[] memory prices) public {
        require(isManager[msg.sender] || owner() == _msgSender(), 'batchUpdate: Not manager');
        require(nfts.length == prices.length, 'batchUpdate: Invalid param length');

        for (uint index = 0; index < nfts.length; index++) {
            address oracle = oracles[nfts[index]];
            if (oracle != address(0)) {
                uint256 roundId = IOracle(oracle).latestRound();
                IOracle(oracle).submit(roundId + 1, prices[index]);
            }
        }
    }
}
