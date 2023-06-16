//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../interfaces/drops/IDropsCompoundingVault.sol';

contract MockCompoudingVault is IDropsCompoundingVault {
    address token;

    constructor(address _token) {
        token = _token;
    }

    function deposit(uint amount) external override returns (uint256) {}

    function withdraw(uint amount) external override returns (uint256) {}

    function want() external view override returns (IERC20Upgradeable) {
        return IERC20Upgradeable(token);
    }

    function getPricePerFullShare() external view override returns (uint256) {}
}
