//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '../../interfaces/balancer/IBalancerPool.sol';
import '../../interfaces/balancer/IBalancerV2Vault.sol';
import '../../interfaces/drops/IChainlinkPriceFactory.sol';
import '../../interfaces/drops/IDropsOracle.sol';
import '../../lib/BalancerLib.sol';

/**
 * @title BalancerStablePool LP token price oracle
 */
contract BalancerStablePoolLPOracle is IDropsOracle {
    address public factory;
    IBalancerV2Vault public vault;
    IBalancerPool public pool;
    bytes32 public poolId;
    address[] public tokens;
    uint8[] public tokenDecimals;

    constructor(address _factory, IBalancerPool _pool) {
        require(_factory != address(0), '_factory address cannot be 0');
        require(address(_pool) != address(0), '_pool address cannot be 0');

        factory = _factory;
        pool = _pool;
        vault = IBalancerV2Vault(_pool.getVault());
        poolId = _pool.getPoolId();
        (tokens, , ) = IBalancerV2Vault(vault).getPoolTokens(poolId);
        for (uint256 i = 0; i < tokens.length; i++) {
            tokenDecimals.push(IERC20Metadata(tokens[i]).decimals());
        }
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

    function _getTokenPriceInETH(address token) internal view returns (uint256) {
        return uint256(IChainlinkPriceFactory(factory).getETHPrice(token));
    }

    function _getETHBalances() internal view returns (uint256[] memory ethBalances) {
        ethBalances = new uint256[](tokens.length);
        (, uint256[] memory balances, ) = vault.getPoolTokens(poolId);

        for (uint256 index = 0; index < tokens.length; index++) {
            ethBalances[index] =
                (_getTokenPriceInETH(tokens[index]) * (balances[index])) /
                (10 ** tokenDecimals[index]);
        }
    }

    function _getArithmeticMean(uint256[] memory ethTotals) internal view returns (uint256) {
        uint256 totalUsd = 0;
        for (uint256 i = 0; i < tokens.length; i++) {
            totalUsd = totalUsd + ethTotals[i];
        }
        return BalancerLib.bdiv(totalUsd, pool.totalSupply());
    }
}
