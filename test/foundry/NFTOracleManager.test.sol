// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'forge-std/Test.sol';
import 'forge-std/console.sol';

import '../../contracts/oracle/NFTOracleManager.sol';
import './Utils.sol';

contract NFTOracleManagerTest is Test {
    NFTOracleManager nftOracleManager;

    address owner;
    address manager;
    address user;

    address nftOracle;

    MockERC20 token;

    function setUp() public {
        // init contracts
        nftOracleManager = new NFTOracleManager();
        nftOracle = address(new MockOracle());
        MockUser mUsers = new MockUser();
        token = new MockERC20('Mock Token', 'MT');

        // init
        manager = mUsers.getNextUserAddress();
        user = mUsers.getNextUserAddress();
        owner = address(this);

        // set oracles
        address[] memory oraclesToSet = new address[](1);
        oraclesToSet[0] = nftOracle;
        bool[] memory statusListToSet = new bool[](1);
        statusListToSet[0] = true;
        nftOracleManager.setOracles(oraclesToSet, statusListToSet);
    }

    function test_permision() public {
        // setManager
        vm.startPrank(manager);
        vm.expectRevert(abi.encodePacked('Ownable: caller is not the owner'));
        nftOracleManager.setManager(manager, true);
    }

    function test_canUpdatePrice(int256 price) public {
        vm.assume(price > 0 && price < type(int256).max / 1000);

        IOracle(nftOracle).submit(0, price);

        int256 expectedMinPrice = (price * nftOracleManager.minChangeRate()) / 1000;
        int256 expectedMaxPrice = (price * nftOracleManager.maxChangeRate()) / 1000;

        (bool isSupport, int256 minPrice, int256 maxPrice, uint256 roundId) = nftOracleManager
            .getUpdateAvailablePriceRange(nftOracle);

        assertTrue(isSupport);
        assertEqUint(roundId, IOracle(nftOracle).latestRound() + 1);
        assertEqUint(uint(expectedMinPrice), uint(minPrice));
        assertEqUint(uint(expectedMaxPrice), uint(maxPrice));
    }

    function test_withdraw(uint tokenBalance, uint ethBalance) public {
        vm.assume(ethBalance < 100 ether && ethBalance > 0 && tokenBalance > 0);

        // test ERC20 withdraw
        token.mint(address(nftOracleManager), tokenBalance);
        assertEqUint(token.balanceOf(user), 0);
        nftOracleManager.withdraw(address(token), user);
        assertEqUint(token.balanceOf(user), tokenBalance);

        // test ether withdraw
        vm.deal(address(nftOracleManager), ethBalance);
        uint256 prevETHBalance = address(user).balance;
        nftOracleManager.withdraw(address(0), user);
        assertEqUint(user.balance, prevETHBalance + ethBalance);
        vm.stopPrank();
    }
}
