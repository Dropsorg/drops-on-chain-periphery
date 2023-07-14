//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../../interfaces/drops/IChainlinkPriceFactory.sol';

interface ISFRXETH {
    function pricePerShare() external view returns (uint256);
}

/**
 * @title aggregator contract that provides eth price of Staked Frax Ether
 */
contract SFRXETHPriceOracle {
    /// @notice address to frxETH
    address public constant sfrxETH = 0xac3E018457B222d93114458476f3E3416Abbe38F;

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function descriton() external pure returns (string memory) {
        return 'Staked Frax Ether oracle';
    }

    function latestRoundData()
        external
        view
        returns (
            uint80 /*roundId*/,
            int256 answer,
            uint256 /*startedAt*/,
            uint256 /*updatedAt*/,
            uint80 /*answeredInRound*/
        )
    {
        answer = int256((1e18 * ISFRXETH(sfrxETH).pricePerShare()) / 1e18);
    }
}
