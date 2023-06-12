//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import '../interfaces/drops/IDropsCompoundingVault.sol';
import '../interfaces/drops/IAuraMarket.sol';
import '../interfaces/aura/IAuraRewardPool.sol';

/** @title AuraLPMigration: get balanceLP from Aura and supply
 */
contract AuraLPMigration is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    /// @notice aura base reward pool
    IAuraRewardPool public auraRewardPool;

    /// @notice auto compounding vault
    IDropsCompoundingVault public compoundingVault;

    /// @notice drops CToken for aura market
    IAuraMarket public dropsAuraMarket;

    /// @notice balancer LP token
    IERC20Upgradeable public balancerLP;

    function initialize(
        IAuraRewardPool _auraRewardPool,
        IDropsCompoundingVault _compoundingVault,
        IAuraMarket _dropsAuraMarket
    ) public payable initializer {
        require(
            _auraRewardPool.asset() == address(_compoundingVault.want()),
            'aura asset are not same with compoundingVault want'
        );

        compoundingVault = _compoundingVault;
        auraRewardPool = _auraRewardPool;
        dropsAuraMarket = _dropsAuraMarket;
        balancerLP = IERC20Upgradeable(_auraRewardPool.asset());
    }

    /// @notice user should approve this contract to withdraw their LP from Aura
    /// @param amount of balancer LP tokens to withdraw from Aura
    function supplyToMarket(uint256 amount) external nonReentrant returns (uint256 shares) {
        address user = msg.sender;

        require(auraRewardPool.allowance(user, address(this)) >= amount, '!allowance');

        // withdraw from Aura
        auraRewardPool.withdraw(amount, address(this), user);
        require(balancerLP.balanceOf(address(this)) >= amount, '!assets');

        // deposit into compounding compoundingVault and get erc20
        balancerLP.approve(address(compoundingVault), amount);
        shares = compoundingVault.deposit(amount);

        // supply to market
        uint256 err = dropsAuraMarket.mintTo(shares, user);
        require(err != 0, '!mint');

        // enable as collateral
        ComptrollerInterface comptroller = dropsAuraMarket.comptroller();
        address[] memory markets = new address[](1);
        markets[0] = address(dropsAuraMarket);
        comptroller.enterMarketsFrom(markets, user);
    }

    /// @notice market will call this function to withdraw balancer LP or restake to Aura
    /// the market should send vault erc20 tokens before call this function
    /// @param withdrawType 1 for withdraw balancer LP, 2 for restake
    function withdraw(address reciver, uint256 amount, uint256 withdrawType) external nonReentrant {
        require(msg.sender == address(dropsAuraMarket), '!market');
        require(withdrawType == 1 || withdrawType == 2, '!withdrawType');
        require(
            IERC20Upgradeable(address(compoundingVault)).balanceOf(address(this)) >= amount,
            '!vaultAmount'
        );

        uint256 withdrawBalance = compoundingVault.withdraw(amount);
        require(withdrawBalance > 0, '!withdrawBalance');
        require(balancerLP.balanceOf(address(this)) >= withdrawBalance, '!lpBalance');

        if (withdrawType == 1) {
            balancerLP.safeTransfer(reciver, withdrawBalance);
        } else {
            balancerLP.approve(address(auraRewardPool), withdrawBalance);
            auraRewardPool.stakeFor(reciver, withdrawBalance);
        }
    }
}
