//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '../../interfaces/balancer/IBalancerV2Vault.sol';
import '../../interfaces/drops/IChainlinkPriceFactory.sol';
import '../../interfaces/drops/IDropsOracle.sol';
import '../../lib/BalancerLib.sol';

interface IBalancerComposablePool {
    function totalSupply() external view returns (uint256);

    function getActualSupply() external view returns (uint256);

    function getPoolId() external view returns (bytes32);

    function getVault() external view returns (address);
}

/**
 * @title Balancer composable stable pool LP token price oracle
 */
contract BalancerComposableStablePoolLPOracle is IDropsOracle {
    /// @notice address to the price factory
    IChainlinkPriceFactory public immutable factory;

    /// @notice balancer pool
    IBalancerComposablePool public immutable pool;

    /// @notice balancer vault
    IBalancerV2Vault public vault;

    /// @notice balancer pool ID
    bytes32 public poolId;

    /// @notice balancer pool tokens
    address[] public tokens;

    /// @notice balancer pool token decimals
    uint8[] public tokenDecimals;

    /// @notice oracle description
    string public description;

    constructor(
        IChainlinkPriceFactory _factory,
        IBalancerComposablePool _pool,
        string memory _description
    ) {
        require(address(_factory) != address(0), '_factory address cannot be 0');
        require(address(_pool) != address(0), '_pool address cannot be 0');

        factory = _factory;
        pool = _pool;
        vault = IBalancerV2Vault(_pool.getVault());
        poolId = _pool.getPoolId();
        (tokens, , ) = IBalancerV2Vault(vault).getPoolTokens(poolId);
        for (uint256 i = 0; i < tokens.length; i++) {
            tokenDecimals.push(IERC20Metadata(tokens[i]).decimals());
        }
        description = _description;
    }

    /* ========== VIEWS ========== */

    function decimals() external pure override returns (uint8) {
        return 18;
    }

    function latestAnswer() external view override returns (int256 answer) {
        uint256[] memory ethTotals = _getETHBalances();
        answer = int256(_getArithmeticMean(ethTotals));
    }

    /* ========== INTERNAL ========== */

    function _getTokenPriceInETH(address token) internal view returns (uint256 price) {
        price = uint256(IChainlinkPriceFactory(factory).getETHPrice(token));
    }

    function _getETHBalances() internal view returns (uint256[] memory ethBalances) {
        ethBalances = new uint256[](tokens.length);
        (, uint256[] memory balances, ) = vault.getPoolTokens(poolId);

        for (uint256 index = 0; index < tokens.length; index++) {
            if (tokens[index] != address(pool)) {
                ethBalances[index] =
                    (_getTokenPriceInETH(tokens[index]) * (balances[index])) /
                    (10 ** tokenDecimals[index]);
            }
        }
    }

    function _getArithmeticMean(uint256[] memory ethTotals) internal view returns (uint256) {
        uint256 totalETH = 0;
        for (uint256 i = 0; i < tokens.length; i++) {
            totalETH = totalETH + ethTotals[i];
        }
        return (totalETH * 1e18) / pool.getActualSupply();
    }
}
