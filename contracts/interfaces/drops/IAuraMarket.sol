//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ComptrollerInterface {
    // modified drops ComptrollerInterface `enterMarkets` function with admin permission and `from` addr
    function enterMarketsFrom(address[] memory cTokens, address from) external returns (uint256);
}

interface IAuraMarket {
    // modified drops CToken's `mint` function with admin permission and `to` addr
    function mintTo(uint256 mintAmount, address to) external returns (uint256);

    function comptroller() external view returns (ComptrollerInterface);
}
