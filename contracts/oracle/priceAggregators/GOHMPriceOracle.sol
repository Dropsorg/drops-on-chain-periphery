//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../interfaces/drops/IDropsOracle.sol';
import '../../interfaces/drops/IChainlinkPriceFactory.sol';

interface IGOHM {
    function index() external view returns (uint256);
}

/**
 * @title OHM governance token price oracle
 */
contract GOHMPriceOracle is IDropsOracle {
    /// @notice address to the price factory
    IChainlinkPriceFactory public immutable factory;

    /// @notice address to the OHM governance
    IGOHM public immutable gOHM;

    /// @notice address to the OHMV2 token
    address public immutable OHM;

    constructor(IChainlinkPriceFactory _factory, IGOHM _gOHM, address _OHM) {
        factory = _factory;
        gOHM = _gOHM;
        OHM = _OHM;
    }

    function decimals() external pure override returns (uint8) {
        return 18;
    }

    function latestAnswer() external view override returns (int256 answer) {
        uint256 tokenETHPrice = uint256(IChainlinkPriceFactory(factory).getETHPrice(OHM));
        require(tokenETHPrice > 0, '!aggregator');
        return int256((tokenETHPrice * gOHM.index()) / 10 ** 9);
    }
}
