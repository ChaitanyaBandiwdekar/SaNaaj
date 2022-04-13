// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {
    string name;
    int256 price;
    string customer;
    string merchant;

    constructor(string memory x) public {
        name = x;
    }

    function set(string memory x) public {
        name = x;
    }

    function get() public view returns (string memory) {
        return name;
    }
}
