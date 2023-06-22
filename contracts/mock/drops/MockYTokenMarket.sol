//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockYTokenMarket {
    function mintTo(uint amount, address user) public returns (uint) {}

    function repayBorrowBehalf(address user, uint amount) public returns (uint) {}

    function setMigrator(address _migrator) public {}
}
