// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

import "../contracts/EtherDistributor.sol";

contract TestEtherDistributor is EtherDistributor {
    function updateState() public {
        return _updateState();
    }

    function calculateShare()
        public
        view
        returns (uint16 _share, uint256 _amount)
    {
        return super._calculateShare();
    }
}
