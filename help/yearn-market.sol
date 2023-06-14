// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IYVTokenMigration {
    function redeem(address reciver, uint256 amount) external;
}

contract CERC20 is CToken {
    function mint(uint mintAmount) external override returns (uint) {
        (uint err, ) = mintInternal(mintAmount, msg.sender);
        return err;
    }

    function mintTo(uint mintAmount, address user) external override returns (uint) {
        require(msg.sender == migration, 'caller is not a migration');
        (uint err, ) = mintInternal(mintAmount, user);
        return err;
    }

    function redeem(uint redeemTokens) external override returns (uint) {
        return redeemInternal(redeemTokens, 0);
    }

    function redeemAndUnwrap(uint redeemTokens) external override returns (uint) {
        return redeemInternal(redeemTokens, 1);
    }

    function borrowUnderlying(uint borrowAmount) external override returns (uint) {
        return borrowInternal(borrowAmount, 1);
    }
}

contract CToken {
    address public migration;

    function setMigration(address _migration) external onlyAdmin {
        require(_migration != address(0), 'INV_MIGRATION');
        migration = _migration;
    }

    function redeemInternal(
        uint redeemTokens,
        uint redeemType
    ) internal nonReentrant returns (uint) {
        // same as previous code

        return redeemFresh(msg.sender, redeemTokens, 0, redeemType);
    }

    /** redeemType == 0 (in yvTokens like yvUSDC)
     *  redeemType == 1 (in toknes like USDC)
     */
    function redeemFresh(
        address payable redeemer,
        uint redeemTokensIn,
        uint redeemAmountIn,
        uint redeemType
    ) internal returns (uint) {
        // same as previous code

        if (redeemType == 0) {
            // in vault
            doTransferOut(redeemer, vars.redeemAmount);
        } else if (redeemType == 1) {
            doTransferOut(migration, vars.redeemAmount);
            migration.redeem(redeemer, vars.redeemAmount);
        } else {
            revert('Not suppot redeemType');
        }
    }

    function mintInternal(
        uint mintAmount,
        address user
    ) internal nonReentrant returns (uint, uint) {
        // same as previous code

        return mintFresh(user, mintAmount);
    }

    function borrowInternal(
        uint borrowAmount,
        bool isUnderlying
    ) internal nonReentrant returns (uint) {
        // same as previous code
        return borrowFresh(msg.sender, borrowAmount, isUnderlying);
    }

    function borrowFresh(
        address payable borrower,
        uint borrowAmount,
        bool isUnderlying
    ) internal returns (uint) {
        // same as previous
        if (!isUnderlying) {
            doTransferOut(borrower, borrowAmount);
        } else {
            doTransferOut(borrower, address(migration));
            migration.redeem(borrower, borrowAmount);
        }

        // same as previous
    }
}

contract Comptroller {
    address public migration;

    function enterMarkets(address[] memory cTokens) public override returns (uint[] memory) {
        return enterMarketsInternal(cTokens, msg.sender);
    }

    function enterMarketsFrom(
        address[] memory cTokens,
        address user
    ) public override returns (uint[] memory) {
        require(msg.sender == migration, 'NOT_MIGRATION');
        return enterMarketsInternal(cTokens, user);
    }

    function enterMarketsInternal(
        address[] memory cTokens,
        address user
    ) internal returns (uint[] memory) {
        uint len = cTokens.length;

        uint[] memory results = new uint[](len);
        for (uint i = 0; i < len; i++) {
            CToken cToken = CToken(cTokens[i]);
            results[i] = uint(addToMarketInternal(cToken, user));
        }
        return results;
    }

    function setMigration(address _migration) external onlyAdmin {
        require(_migration != address(0), 'INV_MIGRATION');
        migration = _migration;
    }
}
