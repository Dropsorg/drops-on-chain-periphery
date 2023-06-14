//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';

import '../interfaces/drops/IDropsYearnMarket.sol';

contract YVTokenMigration is
    Initializable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable,
    PausableUpgradeable
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    /// @notice yearn Vault
    IYearnVault public yVault;

    /// @notice token to deposit into yearn yVault
    IERC20Upgradeable public token;

    /// @notice token to deposit into yearn yVault
    IDropsYearnMarket public dropsYearnMarket;

    /// @notice emitted when withdraw happens
    event LogEmergencyWithdraw(address indexed from, address indexed token, uint256 amount);

    function initialize(
        IYearnVault _yVault,
        IDropsYearnMarket _dropsYearnMarket
    ) public payable initializer {
        __Ownable_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        yVault = _yVault;
        dropsYearnMarket = _dropsYearnMarket;
        token = yVault.token();
    }

    function _depositIntoYearn(
        address user,
        uint256 amount
    ) internal returns (uint256 yvTokesAmount) {
        // withdraw tokens from user
        require(token.allowance(user, address(this)) >= amount, '!allowance');
        token.safeTransferFrom(user, address(this), amount);

        // deposit tokens into yVault
        yvTokesAmount = yVault.deposit(amount, address(this));
    }

    /// @notice supply yvTokens into market
    /// @dev callter should approve this contract before calling.
    ///      deposit tokens into yearn yVault and receives yvTokens (yVault shares)
    ///      supply yvTokens into market and enable them as collateral
    function supplyInYVTokens(uint256 amount) external {
        uint256 yvTokesAmount = _depositIntoYearn(msg.sender, amount);

        // deposit yVault tokens into market for user
        uint256 err = dropsYearnMarket.mintTo(msg.sender, yvTokesAmount);
        require(err != 0, '!mint');

        // enable as collateral
        IDropsYearnComptroller comptroller = dropsYearnMarket.comptroller();
        address[] memory markets = new address[](1);
        markets[0] = address(dropsYearnMarket);
        comptroller.enterMarketsFrom(markets, msg.sender);
    }

    /// @notice repay in yvTokens
    function repayInYVTokens(uint256 amount) external {
        uint256 yvTokesAmount = _depositIntoYearn(msg.sender, amount);

        dropsYearnMarket.repayBorrowBehalf(msg.sender, yvTokesAmount);
    }

    /// @notice market will call this function to withdraw tokens from yearn yVault (yvToken)
    function redeem(
        address reciver,
        uint256 amount
    ) external whenNotPaused nonReentrant returns (uint256 assets) {
        require(msg.sender == address(dropsYearnMarket), '!market');
        require(
            IERC20Upgradeable(address(yVault)).balanceOf(address(this)) >= amount,
            '!vaultAmount'
        );

        assets = yVault.withdraw(amount);
        require(assets > 0 && token.balanceOf(address(this)) >= asset, '!assets');
        token.safeTransfer(receiver, assets);
    }

    /* ========== owner level functions ========== */

    function pause() external whenNotPaused onlyOwner {
        _pause();
    }

    function unpause() external whenPaused onlyOwner {
        _unpause();
    }

    function emergencyWithdraw(address token, address receiver) external onlyOwner {
        uint256 assetBalance;
        if (token == address(0)) {
            // ether
            assetBalance = (address(this)).balance;
            payable(receiver).transfer(assetBalance);
        } else {
            assetBalance = IERC20Upgradeable(token).balanceOf(address(this));
            IERC20Upgradeable(token).safeTransfer(receiver, assetBalance);
        }
        if (assetBalance > 0) {
            emit LogEmergencyWithdraw(receiver, token, assetBalance);
        }
    }
}
