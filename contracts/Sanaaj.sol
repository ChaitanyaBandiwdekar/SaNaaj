// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Sanaaj {
    struct Consumer {
        uint256 id;
        string first_name;
        string last_name;
        string phone;
        string location;
    }
    mapping(address => uint256) balances;
    string item;
    int256 price;
    string customer;
    string merchant;

    constructor(
        string memory x,
        int256 p,
        string memory cust,
        string memory merch
    ) public {
        item = x;
        price = p;
        customer = cust;
        merchant = merch;
        balances[address(this)] = 100;
    }

    function set(
        string memory x,
        int256 p,
        string memory cust,
        string memory merch
    ) public {
        item = x;
        price = p;
        customer = cust;
        merchant = merch;
    }

    function get()
        public
        view
        returns (
            string memory,
            int256,
            string memory,
            string memory
        )
    {
        return (item, price, customer, merchant);
    }

    function getBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }

    function restock(uint256 amount) public {
        balances[address(this)] += amount;
    }

    function purchase(uint256 amount) public payable {
        require(
            msg.value >= amount * 2 ether,
            "You must pay at least 2 ETH per donut"
        );
        require(
            balances[address(this)] >= amount,
            "Not enough donuts in stock to complete this purchase"
        );
        balances[address(this)] -= amount;
        balances[msg.sender] += amount;
    }
}
