//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '../interfaces/drops/IDropsCompoundingVault.sol';
import '../interfaces/aura/IAuraBaseRewardPool.sol';

contract AuraLPMigration {
    IAuraBaseRewardPool public immutable aura;
    IDropsCompoundingVault public immutable vault;
    IERC20 public immutable balancerLP;

    constructor(IAuraBaseRewardPool _aura, IDropsCompoundingVault _vault) {
        vault = _vault;
        aura = _aura;
        balancerLP = IERC20(_aura.asset());
    }

    /// @notice user should approve this contract to withdraw their LP from Aura
    /// @param amount: of balancer LP tokens to withdraw from Aura
    function migrate(uint256 amount) external returns (uint256 shares) {
        require(aura.allowance(msg.sender, address(this)) >= amount, '!allowance');

        // withdraw from Aura
        aura.withdraw(amount, address(this), msg.sender);
        require(balancerLP.balanceOf(address(this)) >= amount, '!assets');

        // deposit compounding vault
        shares = vault.deposit(amount, msg.sender);
    }
}
