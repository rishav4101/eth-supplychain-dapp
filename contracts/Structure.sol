// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

library Structure {
    enum State {
        Manufactured,
        PurchasedByThirdParty,
        ShippedByManufacturer,
        ReceivedByThirdParty,
        PurchasedByCustomer,
        ShippedByThirdParty,
        ReceivedByDeliveryHub,
        ShippedByDeliveryHub,
        ReceivedByCustomer
    }

    struct Company {
        address payable addr;
        string code;
        string name;
        string status;
        string legalType;
        string legalRepresentative;
        uint256 startDate;
        string longitude;
        string latitude;
        string role;
    }

    struct Customer {
        address payable addr;
        string id;
        string name;
        string status;
        string addre;
        string phoneNumber1;
        string phoneNumber2;
        string mail;
        string role;
    }

    struct ProductDetail {
        string name;
        uint256 price;
        string category;
        string status;
        uint256 mfg;
        uint256 exp;
        uint256 createDate;
        uint256 updateDate;
    }

    struct Product {
        uint256 uid;
        string sku;
        address owner;
        State productState;
        address manufacturer;
        address thirdParty;
        address deliveryHub;
        ProductDetail productDetail;
        address customer;
        string transaction;
    }

    struct ProductHistory {
        Product[] history;
    }
}
