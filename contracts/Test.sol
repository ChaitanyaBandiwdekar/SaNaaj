// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

library AssetLibrary {
    struct Consumer {
        uint256 id;
        string first_name;
        string last_name;
        string phone;
        string location;
        int256 allowance;
    }

    struct Merchant {
        uint256 id;
        string first_name;
        string last_name;
        string phone;
        string location;
    }
}

contract Test {
    mapping(string => AssetLibrary.Consumer) public consumerList;
    mapping(address => string) public phoneNumberList;

    constructor() public {
        phoneNumberList[
            0x9345BaF04A62F6A91d20aa08121a16eB39308b70
        ] = "1234567890";
        phoneNumberList[
            0xB793c1d9c9D5050859864DbD321Fc873e7942e54
        ] = "9087654321";
        phoneNumberList[
            0xb7C6562BF283534A775d5198195bfD8d47D22647
        ] = "7890123456";
        phoneNumberList[
            0xb6444A785Bc6d27d3fAcb648dc0714C39F569B24
        ] = "6789012345";
        phoneNumberList[
            0x97b814cdcD7F542f413E2CFef8AF97c6633ffF3D
        ] = "9876540321";

        consumerList["1234567890"] = AssetLibrary.Consumer(
            1,
            "Ram",
            "Ghorpade",
            "1234567890",
            "Mumbai",
            200
        );
        consumerList["9087654321"] = AssetLibrary.Consumer(
            2,
            "Shyam",
            "Deshpande",
            "9087654321",
            "Mumbai",
            200
        );
        consumerList["7890123456"] = AssetLibrary.Consumer(
            3,
            "Atishay",
            "Gachyal",
            "7890123456",
            "Mumbai",
            200
        );
        consumerList["6789012345"] = AssetLibrary.Consumer(
            4,
            "Shubhra",
            "Pandhre",
            "6789012345",
            "Mumbai",
            200
        );
        consumerList["9876540321"] = AssetLibrary.Consumer(
            5,
            "Tamaam",
            "Muddeshwar",
            "9876540321",
            "Mumbai",
            200
        );
    }

    function getConsumer(string memory _phone)
        public
        view
        returns (AssetLibrary.Consumer memory)
    {
        return consumerList[_phone];
    }

    // function getAll() public view returns (AssetLibrary.Consumer[] memory) {
    //     AssetLibrary.Consumer[] memory ret = new AssetLibrary.Consumer[](5);
    //     for (uint256 i = 0; i < 5; i++) {
    //         ret[i] = consumerList[i];
    //     }
    //     return ret;
    // }

    function updateAllowance(string memory _phone, int256 amount) public {
        consumerList[_phone].allowance += amount;
    }

    function getPhoneNumber(address _addr) public view returns (string memory) {
        return phoneNumberList[_addr];
    }
}
