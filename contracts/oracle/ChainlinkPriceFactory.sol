//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '../interfaces/drops/IChainlinkPriceFactory.sol';

/**
 * @title aggregator contract that provides price of tokens
 */
contract ChainlinkPriceFactory is OwnableUpgradeable, IChainlinkPriceFactory {
    /// @notice ETH/USD chainlink aggregator
    AggregatorV3Interface constant ETH_USD =
        AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);

    /// @notice token asset => address of USD chainlink aggregators
    mapping(address => AggregatorV3Interface) public usdAggregators;

    /// @notice token asset => address of ETH chainlink aggregators
    mapping(address => AggregatorV3Interface) public ethAggregators;

    function initialize() public payable initializer {
        __Ownable_init();
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }

    function setUSDAggregator(address asset, AggregatorV3Interface aggregator) external onlyOwner {
        usdAggregators[asset] = aggregator;
    }

    function setETHAggregator(address asset, AggregatorV3Interface aggregator) external onlyOwner {
        ethAggregators[asset] = aggregator;
    }

    function _formatDecimals(int256 price, uint8 priceDecimals) internal pure returns (int256) {
        if (priceDecimals == 18) {
            return price;
        } else if (priceDecimals > 18) {
            return price / int256(10 ** (priceDecimals - 18));
        }
        return price * int256(10 ** (18 - priceDecimals));
    }

    function _getETHUSDPrice() internal view returns (int256) {
        (, int256 ethPrice, , , ) = ETH_USD.latestRoundData(); // decimal is 8
        return _formatDecimals(ethPrice, 8);
    }

    function getUSDPrice(address asset) public view override returns (int256 price) {
        require(asset != address(0), '!asset');
        AggregatorV3Interface aggregator;

        if (address(usdAggregators[asset]) != address(0)) {
            aggregator = usdAggregators[asset];
            (, int256 answer, , , ) = aggregator.latestRoundData();
            price = _formatDecimals(answer, aggregator.decimals());
        } else if (address(ethAggregators[asset]) != address(0)) {
            aggregator = ethAggregators[asset];
            (, int256 ethPrice, , , ) = aggregator.latestRoundData();
            ethPrice = _formatDecimals(ethPrice, aggregator.decimals());
            price = (ethPrice * _getETHUSDPrice()) / (10 ** 18);
        }
    }

    function getETHPrice(address asset) external view override returns (int256 price) {
        require(asset != address(0), '!asset');
        int256 usdPrice = getUSDPrice(asset);

        if (usdPrice > 0) {
            price = (usdPrice * (10 ** 18)) / _getETHUSDPrice();
        }
    }
}
