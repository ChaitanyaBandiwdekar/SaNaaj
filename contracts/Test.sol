// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

// Saffron -- 1, white - 2, yellow -3
// Rice - 4kg, sugar - 0.5kg, wheat - 10kg

library AssetLibrary {
    struct Consumer {
        string ration_card;
        uint256 ration_card_type;
        string first_name;
        string last_name;
        string phone;
        string location;
        uint256 vendor_id;
        string password;
        address wallet_addr;
    }

    struct Vendor {
        uint256 vendor_id;
        string first_name;
        string last_name;
        string phone;
        string location;
        string password;
        bool isBlacklisted;
    }
}

contract Test {
    mapping(string => AssetLibrary.Consumer) public consumerList;
    mapping(uint256 => AssetLibrary.Vendor) public vendorList;
    mapping(string => mapping(string => uint256)) public allowanceList;
    mapping(uint256 => mapping(string => uint256)) public stockList;
    string[] rationCardList;
    uint256[] vendorIDList;
    string adminPassword;

    constructor() public {
        consumerList["MH1234567890"] = AssetLibrary.Consumer(
            "MH1234567890",
            1,
            "Ram",
            "Ghorpade",
            "1234567890",
            "Mumbai",
            1,
            "Hello123",
            0x9345BaF04A62F6A91d20aa08121a16eB39308b70
        );
        consumerList["MH1234509876"] = AssetLibrary.Consumer(
            "MH1234509876",
            2,
            "Shyam",
            "Ghorpade",
            "1234509876",
            "Mumbai",
            1,
            "Hello1234",
            0xB793c1d9c9D5050859864DbD321Fc873e7942e54
        );
        consumerList["MH1234509876"] = AssetLibrary.Consumer(
            "MH1234509876",
            2,
            "Ghanashyam",
            "Deshpande",
            "1234509876",
            "Mumbai",
            1,
            "Hello1235",
            0xb7C6562BF283534A775d5198195bfD8d47D22647
        );
        consumerList["MH9876541230"] = AssetLibrary.Consumer(
            "MH9876541230",
            1,
            "Dagdu",
            "Parab",
            "9876541230",
            "Mumbai",
            2,
            "Hello1236",
            0xb6444A785Bc6d27d3fAcb648dc0714C39F569B24
        );
        consumerList["MH9876504321"] = AssetLibrary.Consumer(
            "MH9876504321",
            3,
            "ABC",
            "XYZ",
            "9876504321",
            "Mumbai",
            2,
            "Hello1237",
            0x97b814cdcD7F542f413E2CFef8AF97c6633ffF3D
        );

        vendorList[1] = AssetLibrary.Vendor(
            1,
            "Siddhesh",
            "Bagwe",
            "1029384756",
            "Mumbai",
            "hello987",
            false
        );
        vendorList[2] = AssetLibrary.Vendor(
            2,
            "Pooja",
            "Kaulgud",
            "9087564132",
            "Mumbai",
            "hello9876",
            false
        );

        adminPassword = "admin1234";
        rationCardList = [
            "MH1234567890",
            "MH1234509876",
            "MH1234509876",
            "MH9876541230",
            "MH9876504321"
        ];
        vendorIDList = [1, 2];
    }

    function getConsumer(string memory _ration)
        public
        view
        returns (AssetLibrary.Consumer memory)
    {
        return consumerList[_ration];
    }

    function getVendor(uint256 _id)
        public
        view
        returns (AssetLibrary.Vendor memory)
    {
        return vendorList[_id];
    }

    function getAllConsumers(uint256 _id, bool byVendor)
        public
        view
        returns (string[] memory)
    {
        if (byVendor) {
            string[] memory consumers;
            uint256 count = 0;
            for (uint256 i = 0; i < rationCardList.length; i++) {
                if (consumerList[rationCardList[i]].vendor_id == _id) {
                    consumers[count] = rationCardList[i];
                    count++;
                }
            }
            return consumers;
        }

        return rationCardList;
    }

    function getAllVendors() public view returns (uint256[] memory) {
        return vendorIDList;
    }

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

    function updateAllowance(
        string memory _ration,
        uint256 _vendorID,
        string memory commodity,
        uint256 amount
    ) public {
        allowanceList[_ration][commodity] -= amount;
        stockList[_vendorID][commodity] -= amount;
    }

    function refillAllowance(string memory _ration) public {
        if (consumerList[_ration].ration_card_type == 1) {
            allowanceList[_ration]["Rice"] = 5;
            allowanceList[_ration]["Wheat"] = 10;
            allowanceList[_ration]["Sugar"] = 1;
            allowanceList[_ration]["Kerosene"] = 5;
        } else if (consumerList[_ration].ration_card_type == 2) {
            allowanceList[_ration]["Rice"] = 10;
            allowanceList[_ration]["Wheat"] = 15;
            allowanceList[_ration]["Sugar"] = 2;
            allowanceList[_ration]["Kerosene"] = 7;
        } else {
            allowanceList[_ration]["Rice"] = 12;
            allowanceList[_ration]["Wheat"] = 17;
            allowanceList[_ration]["Sugar"] = 3;
            allowanceList[_ration]["Kerosene"] = 10;
        }
    }

    function refillStock(uint256 _vendorID) public {
        stockList[_vendorID]["Rice"] = 500;
        stockList[_vendorID]["Wheat"] = 1000;
        stockList[_vendorID]["Sugar"] = 500;
        stockList[_vendorID]["Kerosene"] = 500;
    }

    function blacklist(uint256 _id) public {
        vendorList[_id].isBlacklisted = !vendorList[_id].isBlacklisted;
    }

    function updateCardType(string memory _ration, uint256 card_type) public {
        consumerList[_ration].ration_card_type = card_type;
    }
}
