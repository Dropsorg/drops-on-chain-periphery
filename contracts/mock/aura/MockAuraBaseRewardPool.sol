//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../interfaces/aura/IAuraBaseRewardPool.sol';

contract MockAuraBaseRewardPool is IAuraBaseRewardPool {
    address token;

    constructor(address _token) {
        token = _token;
    }

    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) external override returns (uint256) {}

    function asset() external view override returns (address) {
        return token;
    }

    function deposit(uint256 assets, address receiver) external override returns (uint256) {}

    function allowance(address owner, address spender) external view override returns (uint256) {}
}
