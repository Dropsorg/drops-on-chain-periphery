//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '../../interfaces/drops/IChainlinkPriceFactory.sol';

interface IWrappedstETH {
    function stETH() external view returns (address);

    function getStETHByWstETH(uint256 _wstETHAmount) external view returns (uint256);
}

/**
 * @title aggregator contract that provides eth price of Lido wstETH
 */
contract WstETHPriceOracle {
    /// @notice address to stETH
    address public constant stETH = 0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84;

    /// @notice address to wstETH
    address public constant wstETH = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;

    /// @notice address to the price factory
    address public constant factory = 0x4148D2220511d3521E232ff0F6369a14A9737c9A;

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function descriton() external pure returns (string memory) {
        return 'Lido wstETH oracle';
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
        uint256 stETHPrice = uint256(IChainlinkPriceFactory(factory).getETHPrice(stETH));
        answer = int256((stETHPrice * IWrappedstETH(wstETH).getStETHByWstETH(1e18)) / 1e18);
    }
}
