//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IYearnVault {
    function token() external returns (address);

    function deposit(uint256 amount, address recipient) external returns (uint256);

    function withdraw(uint256 maxShares, address recipient) external returns (uint256);

    function balanceOf(address account) external view returns (uint256);
}
