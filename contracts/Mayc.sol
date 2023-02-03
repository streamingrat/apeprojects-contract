// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Mayc {
    constructor() {}

    function balanceOf(address owner) external view returns (uint256) {
        if (owner != address(0)) { return uint256(1); }
        return uint256(0);
    }
}
