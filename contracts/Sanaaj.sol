// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

// Saffron -- 1, white - 2, yellow -3
// Rice - 4kg, sugar - 0.5kg, wheat - 10kg

library AssetLibrary {
    // struct Consumer {
    //     string ration_card;
    //     uint256 ration_card_type;
    //     string first_name;
    //     string last_name;
    //     string phone;
    //     string location;
    //     uint256 vendor_id;
    //     string password;
    //     address wallet_addr;
    //     uint256 num_of_adults;
    //     uint256 num_of_children;
    // }

    // struct Vendor {
    //     uint256 vendor_id;
    //     string first_name;
    //     string last_name;
    //     string phone;
    //     string location;
    //     string password;
    //     bool isBlacklisted;
    //     address wallet_addr;
    // }

    struct Transaction {
        string consumer_ration_id;
        uint256 vendor_id;
        uint256[] quantity;
        string timestamp;
    }
}

contract Sanaaj {
    uint256 transactionCount;
    // mapping(string => AssetLibrary.Consumer) public consumerList;
    // mapping(uint256 => AssetLibrary.Vendor) public vendorList;
    mapping(string => mapping(string => uint256)) public allowanceList;
    mapping(uint256 => mapping(string => uint256)) public stockList;
    mapping(string => AssetLibrary.Transaction[]) public transactionList;
    string[] rationCardList;
    mapping(uint256 => string[]) public newTransactionList;
    uint256[] vendorIDList;
    address adminAddress;
    string adminPassword;

    constructor() public {
        // consumerList["MH1234567890"] = AssetLibrary.Consumer(
        //     "MH1234567890",
        //     1,
        //     "Ram",
        //     "Ghorpade",
        //     "1234567890",
        //     "Mumbai",
        //     1,
        //     "0x134563d4e440f0e418b0f382f23a2cf301af6d7f648ccfae9895018345d779a3", //"Hello123"
        //     0xFc43ee9441590F044136fC8B225483188a11de92,
        //     2,
        //     2
        // );
        // consumerList["MH1234509666"] = AssetLibrary.Consumer(
        //     "MH1234509666",
        //     2,
        //     "Shyam",
        //     "Ghorpade",
        //     "1234509876",
        //     "Mumbai",
        //     1,
        //     "0x75ca1baec3f3382989affc4cadb0cc93f47e946b247e3a655c6b36d43e64dd2a", //"Hello1234"
        //     0xB793c1d9c9D5050859864DbD321Fc873e7942e54,
        //     2,
        //     3
        // );
        // consumerList["MH1234509876"] = AssetLibrary.Consumer(
        //     "MH1234509876",
        //     2,
        //     "Ghanashyam",
        //     "Deshpande",
        //     "1234509876",
        //     "Mumbai",
        //     1,
        //     "0xbaa0487be7b20f0a7c20804a38771626ec1b04476a9ac7d7b55ba1b80bc2ad2f", //"Hello1235"
        //     0xb7C6562BF283534A775d5198195bfD8d47D22647,
        //     3,
        //     2
        // );
        // consumerList["MH9876541230"] = AssetLibrary.Consumer(
        //     "MH9876541230",
        //     1,
        //     "Dagdu",
        //     "Parab",
        //     "9876541230",
        //     "Mumbai",
        //     2,
        //     "0xa9df37c2d65ced953698bab7a72d9a31b4e7e25e2de561d1d127a8b06b6d70f3", //"Hello1236"
        //     0xb6444A785Bc6d27d3fAcb648dc0714C39F569B24,
        //     4,
        //     2
        // );
        // consumerList["MH9876504321"] = AssetLibrary.Consumer(
        //     "MH9876504321",
        //     3,
        //     "ABC",
        //     "XYZ",
        //     "9876504321",
        //     "Mumbai",
        //     2,
        //     "facd7b3ff9742230f7202864686d424250d70957bd99d8475236f76d1a9e788b", //"Hello1237"
        //     0x97b814cdcD7F542f413E2CFef8AF97c6633ffF3D,
        //     2,
        //     6
        // );

        // vendorList[1] = AssetLibrary.Vendor(
        //     1,
        //     "Siddhesh",
        //     "Bagwe",
        //     "1029384756",
        //     "Mumbai",
        //     "0x9f66dc74cb77e162097a36ddc845799b69f7d721e4146b7f69c873ed9c96697e", //"hello987"
        //     false,
        //     0x675A7359e0d96b9A25DCA5d08e1f1Ee85B9cD24f
        // );
        // vendorList[2] = AssetLibrary.Vendor(
        //     2,
        //     "Pooja",
        //     "Kaulgud",
        //     "9087564132",
        //     "Mumbai",
        //     "15af607aded488ed5fd6d94c14cc4412bd58245f064ce8da28b486857eecf607", //"hello9876"
        //     false,
        //     0x295b6AE0Efe05de0011E9316E27B560cCdCD3DDb
        // );

        adminPassword = "0xac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270"; //"admin1234";
        rationCardList = [
            "MH1234567890",
            "MH1234509666",
            "MH1234509876",
            "MH9876541230",
            "MH9876504321"
        ];
        vendorIDList = [1, 2];
        adminAddress = 0x1964F1519FF7ACAa5E6b2462070cB0d6817FbA4E;
    }

    function getAdminPassword() public view returns (string memory) {
        return adminPassword;
    }

    //

    function getAllowance(string memory _ration)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 rice = allowanceList[_ration]["Rice"];
        uint256 wheat = allowanceList[_ration]["Wheat"];
        uint256 sugar = allowanceList[_ration]["Sugar"];
        uint256 kerosene = allowanceList[_ration]["Kerosene"];

        return (rice, wheat, sugar, kerosene);
    }

    function getStock(uint256 _id)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 rice = stockList[_id]["Rice"];
        uint256 wheat = stockList[_id]["Wheat"];
        uint256 sugar = stockList[_id]["Sugar"];
        uint256 kerosene = stockList[_id]["Kerosene"];

        return (rice, wheat, sugar, kerosene);
    }

    // (ration, 2, [5, 10, 5, 2] )

    function updateAllowance(
        string memory _ration,
        uint256 _vendorID,
        uint256[] memory quantity_commodity,
        string memory timestamp
    ) public {
        allowanceList[_ration]["Rice"] -= quantity_commodity[0];
        allowanceList[_ration]["Wheat"] -= quantity_commodity[1];
        allowanceList[_ration]["Sugar"] -= quantity_commodity[2];
        allowanceList[_ration]["Kerosene"] -= quantity_commodity[3];

        stockList[_vendorID]["Rice"] -= quantity_commodity[0];
        stockList[_vendorID]["Wheat"] -= quantity_commodity[1];
        stockList[_vendorID]["Sugar"] -= quantity_commodity[2];
        stockList[_vendorID]["Kerosene"] -= quantity_commodity[3];

        transactionList[_ration].push(
            AssetLibrary.Transaction(
                _ration,
                _vendorID,
                quantity_commodity,
                timestamp
            )
        );
    }

    function pushTransactions(
        string[] memory transactionList123,
        uint256 vendor_id
    ) public {
        for (uint256 i = 0; i < transactionList123.length; i++) {
            newTransactionList[vendor_id].push(transactionList123[i]);
        }
    }

    function getTransactions(uint256 vendor_id)
        public
        view
        returns (string[] memory)
    {
        return newTransactionList[vendor_id];
    }

    // function refillAllowance(string memory _ration) public {

    //     if (consumerList[_ration].ration_card_type == 1) {
    //         allowanceList[_ration]["Rice"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*5;
    //         allowanceList[_ration]["Wheat"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*5;
    //         allowanceList[_ration]["Sugar"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*1;
    //         allowanceList[_ration]["Kerosene"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*5;
    //     } else if (consumerList[_ration].ration_card_type == 2) {
    //         allowanceList[_ration]["Rice"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*6;
    //         allowanceList[_ration]["Wheat"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*6;
    //         allowanceList[_ration]["Sugar"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*1;
    //         allowanceList[_ration]["Kerosene"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*6;
    //     } else {
    //         allowanceList[_ration]["Rice"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*7;
    //         allowanceList[_ration]["Wheat"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*7;
    //         allowanceList[_ration]["Sugar"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*2;
    //         allowanceList[_ration]["Kerosene"] = (consumerList[_ration].num_of_adults+consumerList[_ration].num_of_children)*7;
    //     }

    // }

    // function refillStock(uint256 _vendorID) public {
    //     stockList[_vendorID]["Rice"] = 500;
    //     stockList[_vendorID]["Wheat"] = 1000;
    //     stockList[_vendorID]["Sugar"] = 500;
    //     stockList[_vendorID]["Kerosene"] = 500;
    // }

    //

    // function resetConsumerPassword(
    //     string memory ration_id,
    //     string memory new_password
    // ) public {
    //     string memory password1 = toHex(sha256(abi.encodePacked(new_password)));
    //     consumerList[ration_id].password = password1;
    // }

    // function resetVendorPassword(uint256 vendor_id, string memory new_password)
    //     public
    // {
    //     string memory password1 = toHex(sha256(abi.encodePacked(new_password)));
    //     vendorList[vendor_id].password = password1;
    // }

    function getAdminAddress() public view returns (address) {
        return adminAddress;
    }

    function checkAdminCredentials(string memory password)
        public
        view
        returns (bool)
    {
        string memory hashed_password = toHex(
            sha256(abi.encodePacked(password))
        );
        return (keccak256(abi.encodePacked((hashed_password))) ==
            keccak256(abi.encodePacked((adminPassword))));
    }

    function toHex(bytes32 data) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "0x",
                    toHex16(bytes16(data)),
                    toHex16(bytes16(data << 128))
                )
            );
    }

    function toHex16(bytes16 data) internal pure returns (bytes32 result) {
        result =
            (bytes32(data) &
                0xFFFFFFFFFFFFFFFF000000000000000000000000000000000000000000000000) |
            ((bytes32(data) &
                0x0000000000000000FFFFFFFFFFFFFFFF00000000000000000000000000000000) >>
                64);
        result =
            (result &
                0xFFFFFFFF000000000000000000000000FFFFFFFF000000000000000000000000) |
            ((result &
                0x00000000FFFFFFFF000000000000000000000000FFFFFFFF0000000000000000) >>
                32);
        result =
            (result &
                0xFFFF000000000000FFFF000000000000FFFF000000000000FFFF000000000000) |
            ((result &
                0x0000FFFF000000000000FFFF000000000000FFFF000000000000FFFF00000000) >>
                16);
        result =
            (result &
                0xFF000000FF000000FF000000FF000000FF000000FF000000FF000000FF000000) |
            ((result &
                0x00FF000000FF000000FF000000FF000000FF000000FF000000FF000000FF0000) >>
                8);
        result =
            ((result &
                0xF000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000) >>
                4) |
            ((result &
                0x0F000F000F000F000F000F000F000F000F000F000F000F000F000F000F000F00) >>
                8);
        result = bytes32(
            0x3030303030303030303030303030303030303030303030303030303030303030 +
                uint256(result) +
                (((uint256(result) +
                    0x0606060606060606060606060606060606060606060606060606060606060606) >>
                    4) &
                    0x0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F) *
                39
        );
    }
}
