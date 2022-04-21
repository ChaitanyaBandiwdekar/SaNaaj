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
        address wallet_addr;
    }

    struct Transaction {
        string consumer_ration_id;
        uint256 vendor_id;
        uint256[] quantity;
        string timestamp;
    }

    struct Complaint {
        string ration_id;
        uint256 vendor_id;
        string complaint_content;
        string time;
    }
}

contract Sanaaj {
    uint256 transactionCount;
    mapping(string => AssetLibrary.Consumer) public consumerList;
    mapping(uint256 => AssetLibrary.Vendor) public vendorList;
    mapping(string => mapping(string => uint256)) public allowanceList;
    mapping(uint256 => mapping(string => uint256)) public stockList;
    mapping(string => AssetLibrary.Transaction[]) public transactionList;
    mapping(string => AssetLibrary.Transaction[]) public pendingTransactionList;
    AssetLibrary.Complaint[] public complaintList;
    string[] rationCardList;
    uint256[] vendorIDList;
    address adminAddress;
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
            0xD905f36ceDFfC58c3B16A3Dd0759Ef8cd3DCea8a
        );
        consumerList["MH1234509666"] = AssetLibrary.Consumer(
            "MH1234509666",
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
            false,
            0x81472D49E156dfbe98c2d3B311fb0512756Fe155
        );
        vendorList[2] = AssetLibrary.Vendor(
            2,
            "Pooja",
            "Kaulgud",
            "9087564132",
            "Mumbai",
            "hello9876",
            false,
            0x295b6AE0Efe05de0011E9316E27B560cCdCD3DDb
        );

        adminPassword = "admin1234";
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

    function getAdminPassword()public view returns(string memory){
        return adminPassword;
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

    function getAllConsumers() public view returns (string[] memory) {
        // if (byVendor) {
        //     string[] memory consumers;
        //     uint256 count = 0;
        //     for (uint256 i = 0; i < rationCardList.length; i++) {
        //         if (consumerList[rationCardList[i]].vendor_id == _id) {
        //             consumers[count] = rationCardList[i];
        //             count++;
        //         }
        //     }
        //     return consumers;
        // }

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

    function getTransactions(string memory _ration)
        public
        view
        returns (AssetLibrary.Transaction[] memory)
    {
        return transactionList[_ration];
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

    function addConsumer(
        string memory ration_card,
        uint256 ration_card_type,
        string memory first_name,
        string memory last_name,
        string memory phone,
        string memory location,
        uint256 vendor_id,
        string memory password,
        address wallet_addr
    ) public {
        AssetLibrary.Consumer memory consumer = AssetLibrary.Consumer(
            ration_card,
            ration_card_type,
            first_name,
            last_name,
            phone,
            location,
            vendor_id,
            password,
            wallet_addr
        );

        consumerList[ration_card] = consumer;
        rationCardList.push(ration_card);
    }

    function addVendor(
        uint256 vendor_id,
        string memory first_name,
        string memory last_name,
        string memory phone,
        string memory location,
        string memory password,
        bool isBlacklisted,
        address wallet_addr
    ) public {
        AssetLibrary.Vendor memory vendor = AssetLibrary.Vendor(
            vendor_id,
            first_name,
            last_name,
            phone,
            location,
            password,
            isBlacklisted,
            wallet_addr
        );

        vendorList[vendor_id] = vendor;
        vendorIDList.push(vendor_id);
    }

    function addComplaint(
        string memory ration_id,
        uint256 vendor_id,
        string memory complaint_content,
        string memory time
    ) public {
        AssetLibrary.Complaint memory complaint = AssetLibrary.Complaint(
            ration_id,
            vendor_id,
            complaint_content,
            time
        );

        complaintList.push(complaint);
    }

    function getAllComplaints()
        public
        view
        returns (AssetLibrary.Complaint[] memory)
    {
        return complaintList;
    }
}
