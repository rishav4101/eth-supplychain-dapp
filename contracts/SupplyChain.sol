// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import './rolesUtils/Customer.sol';
import './rolesUtils/DeliveryHub.sol';
import './rolesUtils/Manufacturer.sol';
import './rolesUtils/SortationHub.sol';
import './rolesUtils/Thirdparty.sol';

contract SupplyChain is Customer,DeliveryHub,Manufacturer,SortationHub,Thirdparty{
  //product code
uint uid;

  uint sku;

  address owner;
  Manufacturer private m;
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

  // State constant defaultState = State.Manufactured;
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
  struct SortationHubDetails{
    address sortationHub;
    string sortationHubLongitude;
    string sortationHubLatitude;
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
      SortationHubDetails sortationhub;
      ProductDetails productdet;
      DeliveryHubDetails deliveryhub;
      address customer;
    }

  struct ProductHistory{
      Product[] history;
  }
  mapping (uint => Product) products;
  mapping (uint => ProductHistory) productHistory;
  
  
  constructor() public payable{
    owner = msg.sender;
    sku = 1;
    uid = 1;
    m = new Manufacturer();
  }

  event  Manufactured(uint uid);
  event  PurchasedByThirdParty(uint uid);
  event  ShippedByManufacturer(uint uid);
  event  ReceivedByThirdParty(uint uid);
  event  PurchasedByCustomer(uint uid);
  event  ShippedByThirdParty(uint uid);
  event  ReceivedByDeliveryHub(uint uid);
  event  ShippedByDeliveryHub(uint uid);
  event  ReceivedByCustomer(uint uid);
  
  modifier verifyOwner() {
      require(msg.sender == owner);
      _;
  }

  modifier verifyAddress(address add) {
      require(msg.sender == add);
      _;
  }
  
  modifier manufactured(uint _uid){
    require(products[_uid].productState == State.Manufactured);
    _;
  }
  
  modifier shippedByManufacturer(uint _uid){
    require(products[_uid].productState == State.ShippedByManufacturer);
    _;
  }
  
  modifier receivedByThirdParty(uint _uid){
    require(products[_uid].productState == State.ReceivedByThirdParty);
    _;
  }
  
  modifier purchasedByCustomer(uint _uid){
    require(products[_uid].productState == State.PurchasedByCustomer);
    _;
  }
  
  modifier shippedByThirdParty(uint _uid){
    require(products[_uid].productState ==  State.ShippedByThirdParty);
    _;
  }

  modifier receivedByDeliveryHub(uint _uid){
    require(products[_uid].productState == State.ReceivedByDeliveryHub);
    _;
  }

  modifier shippedByDeliveryHub(uint _uid){
    require(products[_uid].productState == State.ShippedByDeliveryHub);
    _;
  }
  
  modifier receivedByCustomer(uint _uid){
    require(products[_uid].productState == State.ReceivedByCustomer);
    _;
  }
  
  