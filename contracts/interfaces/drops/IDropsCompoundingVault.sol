//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDropsCompoundingVault {
    function deposit(uint _amount, address _user) external returns (uint256);

    function getPricePerFullShare() external view returns (uint256);
}
