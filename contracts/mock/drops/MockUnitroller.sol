//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockUnitroller {
    function enterMarketsFrom(
        address[] memory cTokens,
        address user
    ) public returns (uint[] memory) {}

    function _setMigrator(address _migrator) public {}
}
