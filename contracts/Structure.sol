// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Structure{
    enum State
    {
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
  struct ManufactureDetails{
      address manufacturer;
      string manufacturerName;
      string manufacturerDetails;
      string manufacturerLongitude;
      string manufacturerLatitude;
      uint256 manufacturedDate;
  }
  struct ProductDetails{
      string productName;
      uint productCode;
      uint productPrice;
      string productCategory;
  }
  struct ThirdPartyDetails{
    address thirdParty;
    string thirdPartyLongitude;
    string thirdPartyLatitude;
  }
  struct DeliveryHubDetails{
      address deliveryHub;
      string deliveryHubLongitude;
      string deliveryHubLatitude;
  }
  struct Product {
      uint uid;
      uint sku;
      address owner;
      State productState;
      ManufactureDetails manufacturer;
      ThirdPartyDetails thirdparty;
      ProductDetails productdet;
      DeliveryHubDetails deliveryhub;
      address customer;
    }

  struct ProductHistory{
      Product[] history;
  }

  struct Roles{
    bool Manufacturer;
    bool ThirdParty;
    bool DeliveryHub;
  }
}