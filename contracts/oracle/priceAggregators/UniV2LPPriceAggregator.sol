//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '../../lib/PRBMath.sol';
import '../../interfaces/uniswap/IUniswapV2Pair.sol';
import '../../interfaces/drops/IDropsOracle.sol';

/**
 * @title Price Aggregator for uniswap V2 LP tokens
 */
contract UniV2LPPriceAggregator {
    /// @notice WETH address
    address constant WETH = address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    /// @notice address of Pair
    IUniswapV2Pair public immutable pair;

    /// @notice address of token that is not WETH
    address public immutable token;

    /// @notice address of oracle for token ETH price
    IDropsOracle public immutable tokenOracle;

    constructor(IUniswapV2Pair pairAddr, address tokenAddr, IDropsOracle tokenOracleAddr) {
        pair = pairAddr;
        token = tokenAddr;
        tokenOracle = tokenOracleAddr;
    }

    /// @dev returns the latest price of asset
    /// @notice we can reference LP pricing from
    /// https://blog.alphaventuredao.io/fair-lp-token-pricing/
    function latestAnswer() external view returns (int256 answer) {
        (uint256 r0, uint256 r1, ) = pair.getReserves();

        uint256 tokenReserve = pair.token0() == WETH ? r1 : r0;
        uint8 tokenDecimals = IERC20Metadata(token).decimals();
        if (tokenDecimals != 18) {
            tokenReserve = (tokenReserve * (10 ** 18)) / (10 ** (IERC20Metadata(token).decimals()));
        }

        uint256 tokenETHPrice = uint256(tokenOracle.latestAnswer());

        uint256 wethReserve = pair.token0() == WETH ? r0 : r1;
        uint256 r = PRBMath.sqrt(tokenReserve * wethReserve);

        uint256 p = PRBMath.sqrt(tokenETHPrice * 1e18);

        answer = int256((2 * r * p) / pair.totalSupply());
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }
}
