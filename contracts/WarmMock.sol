// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract WarmMock {

    constructor() {}

    function balanceOf(address contractAddress, address owner) external view returns (uint256) {
        return 1;
    }
}
